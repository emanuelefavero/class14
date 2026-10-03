import { db } from '#app/db/db.js';
import * as projectsRepository from '#app/resources/projects/projectsRepository.js';
import {
  compareProjects,
  compareText,
  normalizeProjectTopics,
} from '#app/utils/catalog.js';

/**
 * Returns the resources catalog with all linked project summaries.
 * Search is literal; topic selects items through their projects without
 * trimming the returned associations. Unlinked items have projects: [].
 * @example
 * await findAll({ search: 'react', topic: 'React' });
 */
export const findAll = async ({ search, topic } = {}) => {
  // LEFT JOIN retains catalog entries that have no project associations.
  const [rows] = await db.query(`
    SELECT resources.id, title, url, project_resources.project_id
    FROM resources
    LEFT JOIN project_resources ON project_resources.resource_id = resources.id
  `);
  const projects = await projectsRepository.findAll();
  const projectsById = new Map(
    projects.map((project) => [project.id, project]),
  );
  const itemsById = new Map();

  // One result row per association becomes one item with a projects array.
  // The junction primary key already guarantees unique item/project pairs.
  for (const row of rows) {
    const { project_id, ...summary } = row;
    if (!itemsById.has(row.id)) {
      itemsById.set(row.id, { ...summary, projects: [] });
    }
    const project = projectsById.get(project_id);
    if (project) itemsById.get(row.id).projects.push(project);
  }

  // Filter projects by the provided topic, if any.
  const topicName = topic?.toLowerCase();
  const matchingProjectIds = new Set();
  if (topicName) {
    for (const project of projects) {
      const matchesTopic = project.topics.some(
        (name) => name.toLowerCase() === topicName,
      );
      if (matchesTopic) matchingProjectIds.add(project.id);
    }
  }

  // Filter items by the provided search term, if any.
  const searchTerm = search?.toLowerCase();
  const items = [...itemsById.values()];
  const filteredItems = items.filter((item) => {
    if (searchTerm) {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    if (!topicName) return true;
    return item.projects.some((project) => matchingProjectIds.has(project.id));
  });

  // Sort the projects within each item and then sort the items themselves.
  for (const item of filteredItems) item.projects.sort(compareProjects);
  return filteredItems.sort(
    (left, right) => compareText(left.title, right.title) || left.id - right.id,
  );
};

/**
 * Creates a resource and links it to existing projects in one transaction.
 * Returns an explicit outcome for expected duplicate or missing-project cases.
 */
export const create = async ({ title, url, project_ids }) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Load every project to preserve the catalog's canonical topic spelling.
    const [projectRows] = await connection.query(`
      SELECT id, slug, title, topics
      FROM projects
      ORDER BY id
    `);
    const requestedIds = new Set(project_ids);
    const projects = normalizeProjectTopics(projectRows)
      .filter((project) => requestedIds.has(project.id))
      .sort(compareProjects);

    if (projects.length !== requestedIds.size) {
      await connection.rollback();
      return { outcome: 'project_not_found' };
    }

    const [result] = await connection.query(
      'INSERT INTO resources (title, url) VALUES (?, ?)',
      [title, url],
    );

    // Link the newly created resource to the specified projects.
    const resourceId = result.insertId;
    const placeholders = project_ids.map(() => '(?, ?)').join(', ');
    const values = project_ids.flatMap((projectId) => [projectId, resourceId]);

    await connection.query(
      `INSERT INTO project_resources (project_id, resource_id)
       VALUES ${placeholders}`,
      values,
    );

    await connection.commit();

    return {
      outcome: 'created',
      resource: { id: resourceId, title, url, projects },
    };
  } catch (error) {
    await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      return { outcome: 'duplicate_url' };
    }

    throw error;
  } finally {
    connection.release();
  }
};

/** Deletes a resource by ID; junction rows are removed by ON DELETE CASCADE. */
export const removeById = async (id) => {
  const [result] = await db.query('DELETE FROM resources WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

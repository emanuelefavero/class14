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
 * const resources = await findAll({ search: 'react', topic: 'React' });
 * // [{ id, title, url, projects: [{ id, slug, title, topics }] }]
 */
export const findAll = async ({ search, topic } = {}) => {
  // Fetch all resources along with their project associations.
  // LEFT JOIN retains catalog entries that have no project associations.
  // Each row represents a resource potentially linked to a project.
  const [rows] = await db.query(`
    SELECT resources.id, title, url, project_resources.project_id
    FROM resources
    LEFT JOIN project_resources ON project_resources.resource_id = resources.id
  `);
  const projects = await projectsRepository.findAll();
  const projectsById = new Map(
    projects.map((project) => [project.id, project]),
  );

  // Prepare a map to collect resources by their ID for easy grouping.
  const itemsById = new Map();

  // Group rows by resource ID, accumulating linked projects.
  for (const row of rows) {
    const { project_id, ...summary } = row;
    if (!itemsById.has(row.id)) {
      itemsById.set(row.id, { ...summary, projects: [] });
    }
    const project = projectsById.get(project_id);
    if (project) itemsById.get(row.id).projects.push(project);
  }

  // Determine which projects match the given topic, if any.
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

  // Prepare the search term for literal matching.
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

  // Sort the projects within each filtered resource and then sort the resources themselves.
  for (const item of filteredItems) item.projects.sort(compareProjects);
  return filteredItems.sort(
    (left, right) => compareText(left.title, right.title) || left.id - right.id,
  );
};

/**
 * Creates a resource and links it to existing projects in one transaction.
 * Returns an explicit outcome for expected duplicate or missing-project cases.
 * @example
 * const result = await create({ title, url, project_ids: [1, 2] });
 * // { outcome: 'created', resource: { id, title, url, projects } }
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
      // Roll back before inserting anything when at least one requested project does not exist.
      await connection.rollback();
      return { outcome: 'project_not_found' };
    }

    const [result] = await connection.query(
      'INSERT INTO resources (title, url) VALUES (?, ?)',
      [title, url],
    );

    // Insert all junction rows before committing so the resource cannot be saved with partial associations.
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

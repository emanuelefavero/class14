import { db } from '#app/db/db.js';
import * as projectsRepository from '#app/resources/projects/projectsRepository.js';
import { compareProjects, compareText } from '#app/utils/catalog.js';

/**
 * Returns the cheatsheets catalog with all linked project summaries.
 * Search is literal; topic selects items through their projects without
 * trimming the returned associations. Unlinked items have projects: [].
 * @example
 * const cheatsheets = await findAll({ search: 'react', topic: 'React' });
 * // [{ id, slug, title, file_path, projects: [{ id, slug, title, topics }] }]
 */
export const findAll = async ({ search, topic } = {}) => {
  // LEFT JOIN retains catalog entries that have no project associations.
  const [rows] = await db.query(`
    SELECT cheatsheets.id, slug, title, file_path, project_cheatsheets.project_id
    FROM cheatsheets
    LEFT JOIN project_cheatsheets ON project_cheatsheets.cheatsheet_id = cheatsheets.id
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

  // Build a lookup of matching project IDs while keeping every linked project in the returned item.
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

  const searchTerm = search?.toLowerCase();
  const items = [...itemsById.values()];
  const filteredItems = items.filter((item) => {
    if (searchTerm) {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm) ||
        item.slug.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }
    if (!topicName) return true;
    return item.projects.some((project) => matchingProjectIds.has(project.id));
  });

  for (const item of filteredItems) item.projects.sort(compareProjects);
  return filteredItems.sort(
    (left, right) =>
      compareText(left.title, right.title) ||
      compareText(left.slug, right.slug),
  );
};

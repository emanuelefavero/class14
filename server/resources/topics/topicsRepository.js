import * as cheatsheetsRepository from '#app/resources/cheatsheets/cheatsheetsRepository.js';
import * as projectsRepository from '#app/resources/projects/projectsRepository.js';
import * as resourcesRepository from '#app/resources/resources/resourcesRepository.js';
import { compareTopics } from '#app/utils/catalog.js';

/**
 * Returns topics derived from the project catalog with their project count.
 * @example
 * const topics = await findAll();
 * // [{ name: 'React', project_count: 5 }]
 */
export const findAll = async () => {
  const projects = await projectsRepository.findAll();

  // Project topics are already canonical and unique within each project, so every occurrence represents one project.
  const counts = new Map();
  for (const project of projects) {
    for (const name of project.topics) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }

  const topics = [...counts].map(([name, project_count]) => ({
    name,
    project_count,
  }));

  return topics.sort((left, right) => compareTopics(left.name, right.name));
};

/**
 * Returns projects and materials indirectly related through those projects.
 * Returns null when the topic does not exist.
 * @example
 * const topic = await findByName('React');
 * // { name, project_count, projects, related_cheatsheets, related_resources }
 */
export const findByName = async (name) => {
  const projects = await projectsRepository.findAll({ topic: name });
  if (!projects.length) return null;

  // Reuse the spelling selected during project normalization instead of the casing received from the URL.
  const canonicalName = projects[0].topics.find(
    (topic) => topic.toLowerCase() === name.toLowerCase(),
  );

  // Fetch both material catalogs concurrently because neither query depends on the other.
  const [cheatsheets, resources] = await Promise.all([
    cheatsheetsRepository.findAll({ topic: canonicalName }),
    resourcesRepository.findAll({ topic: canonicalName }),
  ]);

  // Catalog repositories already deduplicate materials shared by multiple projects, so only their nested projects are removed here.
  return {
    name: canonicalName,
    project_count: projects.length,
    projects,
    related_cheatsheets: cheatsheets.map(({ projects, ...summary }) => summary),
    related_resources: resources.map(({ projects, ...summary }) => summary),
  };
};

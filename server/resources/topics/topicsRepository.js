import * as cheatsheetsRepository from '#/resources/cheatsheets/cheatsheetsRepository.js';
import * as projectsRepository from '#/resources/projects/projectsRepository.js';
import * as resourcesRepository from '#/resources/resources/resourcesRepository.js';
import { compareTopics } from '#/utils/catalog.js';

/** Returns unique project topics and the number of projects for each tag. */
export const findAll = async () => {
  const projects = await projectsRepository.findAll();

  // Count the occurrences of each topic across all projects.
  const counts = new Map();
  for (const project of projects) {
    for (const name of project.topics) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }

  // Transform the counts map into an array of topic objects.
  const topics = [...counts].map(([name, project_count]) => ({
    name,
    project_count,
  }));

  // Sort topics alphabetically by name before returning.
  return topics.sort((left, right) => compareTopics(left.name, right.name));
};

/** Returns projects and indirectly related materials; null for an unknown tag. */
export const findByName = async (name) => {
  // Get all projects associated with the given topic.
  const projects = await projectsRepository.findAll({ topic: name });
  if (!projects.length) return null;
  const canonicalName = projects[0].topics.find(
    (topic) => topic.toLowerCase() === name.toLowerCase(),
  );

  // Fetch related cheatsheets and resources concurrently.
  const [cheatsheets, resources] = await Promise.all([
    cheatsheetsRepository.findAll({ topic: canonicalName }),
    resourcesRepository.findAll({ topic: canonicalName }),
  ]);

  // Catalogs already contain one item per ID, even when projects share materials.
  return {
    name: canonicalName,
    project_count: projects.length,
    projects,
    related_cheatsheets: cheatsheets.map(({ projects, ...summary }) => summary),
    related_resources: resources.map(({ projects, ...summary }) => summary),
  };
};

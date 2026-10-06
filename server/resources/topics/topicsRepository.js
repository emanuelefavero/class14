import * as cheatsheetsRepository from '#app/resources/cheatsheets/cheatsheetsRepository.js';
import * as projectsRepository from '#app/resources/projects/projectsRepository.js';
import * as resourcesRepository from '#app/resources/resources/resourcesRepository.js';
import { compareTopics } from '#app/utils/catalog.js';

/**
 * Returns topics derived from the project catalog with their project count
 * @example
 * const topics = await findAll();
 * // [{ name: 'React', project_count: 5 }]
 */
export const findAll = async () => {
  const projects = await projectsRepository.findAll();

  // Count the number of projects associated with each topic.
  const counts = new Map();
  for (const project of projects) {
    for (const name of project.topics) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }

  // Convert the counts map into an array of topic objects with name and project_count.
  const topics = [...counts].map(([name, project_count]) => ({
    name,
    project_count,
  }));

  // Sort the topics alphabetically by their name before returning.
  return topics.sort((left, right) => compareTopics(left.name, right.name));
};

/**
 * Returns a topic with its canonical name, project count, and related materials.
 * Returns null if the topic does not exist.
 * @example
 * const topic = await findByName('React');
 * // { name, project_count, projects, related_cheatsheets, related_resources }
 */
export const findByName = async (name) => {
  const projects = await projectsRepository.findAll({ topic: name });
  if (!projects.length) return null;

  // Determine the canonical spelling of the topic from the first matching project.
  const canonicalName = projects[0].topics.find(
    (topic) => topic.toLowerCase() === name.toLowerCase(),
  );

  // Fetch all cheatsheets and resources related to the canonical topic concurrently.
  const [cheatsheets, resources] = await Promise.all([
    cheatsheetsRepository.findAll({ topic: canonicalName }),
    resourcesRepository.findAll({ topic: canonicalName }),
  ]);

  // Return the topic object with its canonical name, project count, and related materials.
  return {
    name: canonicalName,
    project_count: projects.length,
    projects,
    related_cheatsheets: cheatsheets.map(
      ({ _projects, ...summary }) => summary,
    ),
    related_resources: resources.map(({ _projects, ...summary }) => summary),
  };
};

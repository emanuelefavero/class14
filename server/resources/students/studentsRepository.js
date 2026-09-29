import { db } from '#app/db/db.js';
import * as projectsRepository from '#app/resources/projects/projectsRepository.js';
import { compareText, compareTopics } from '#app/utils/catalog.js';

// Adds a GitHub URL to a student summary.
const toSummary = (student) => ({
  ...student,
  github_url: `https://github.com/${student.github_username}`,
});

/**
 * Returns student summaries sorted by name and username.
 * Search matches name/username; topic selects students with a linked project.
 * @example
 * await findAll({ search: 'emanuele', topic: 'React' });
 */
export const findAll = async ({ search, topic } = {}) => {
  let sql =
    'SELECT students.id, name, github_username, avatar_path FROM students';
  const values = [];

  // If topic is provided, filter students by linked projects with that topic.
  if (topic) {
    const projects = await projectsRepository.findAll({ topic });
    if (projects.length === 0) return [];

    const projectIds = projects.map((project) => project.id);
    const placeholders = projectIds.map(() => '?').join(', ');

    // DISTINCT keeps a student appearing once even with several matching projects.
    sql = `SELECT DISTINCT students.id, name, github_username, avatar_path
           FROM students
           INNER JOIN student_projects ON student_projects.student_id = students.id
           WHERE student_projects.project_id IN (${placeholders})`;
    values.push(...projectIds);
  }

  const [rows] = await db.query(sql, values);

  // Filter students by the provided search term, if any.
  const searchTerm = search?.toLowerCase();
  const students = rows.filter((student) => {
    if (!searchTerm) return true;
    const matchesName = student.name.toLowerCase().includes(searchTerm);
    const matchesUsername = student.github_username
      .toLowerCase()
      .includes(searchTerm);
    return matchesName || matchesUsername;
  });

  // Map the filtered students to summaries and sort them by name and username.
  return students
    .map(toSummary)
    .sort(
      (left, right) =>
        compareText(left.name, right.name) ||
        compareText(left.github_username, right.github_username),
    );
};

/**
 * Returns a student profile, available repositories and derived topics.
 * Username lookup ignores case; returns null if absent. A student without
 * repositories has projects: [], repository_count: 0 and topics: [].
 */
export const findByUsername = async (username) => {
  const [[student]] = await db.query(
    `SELECT id, name, github_username, avatar_path
     FROM students WHERE LOWER(github_username) = LOWER(?)`,
    [username],
  );
  if (!student) return null;

  const [links] = await db.query(
    'SELECT project_id, repo_url FROM student_projects WHERE student_id = ?',
    [student.id],
  );
  const repositoryUrls = new Map(
    links.map((link) => [link.project_id, link.repo_url]),
  );
  // Reuse canonical topics and project ordering from the catalog.
  const allProjects = await projectsRepository.findAll();
  const projects = [];
  const topicNames = new Set();

  for (const project of allProjects) {
    if (!repositoryUrls.has(project.id)) continue;
    projects.push({ ...project, repo_url: repositoryUrls.get(project.id) });
    for (const topic of project.topics) topicNames.add(topic);
  }

  const topics = [...topicNames];
  topics.sort(compareTopics);

  return {
    ...toSummary(student),
    projects,
    repository_count: projects.length,
    topics,
  };
};

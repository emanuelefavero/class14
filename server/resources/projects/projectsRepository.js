import { db } from '#/db/db.js';
import { compareText, normalizeProjectTopics } from '#/utils/catalog.js';

const compareProjects = (left, right) =>
  compareText(left.title, right.title) || compareText(left.slug, right.slug);

export const findAll = async ({ search, topic } = {}) => {
  const [rows] = await db.query(`
    SELECT id, slug, title, topics
    FROM projects
    ORDER BY id
  `);

  const searchTerm = search?.toLowerCase();
  const tag = topic?.toLowerCase();

  return normalizeProjectTopics(rows)
    .filter((project) => {
      if (
        searchTerm &&
        !project.title.toLowerCase().includes(searchTerm) &&
        !project.slug.toLowerCase().includes(searchTerm)
      )
        return false;

      if (tag && !project.topics.some((value) => value.toLowerCase() === tag)) {
        return false;
      }

      return true;
    })
    .sort(compareProjects);
};

export const findBySlug = async (slug) => {
  const [[row]] = await db.query(
    'SELECT id, description FROM projects WHERE LOWER(slug) = LOWER(?)',
    [slug],
  );

  if (!row) return null;

  const projects = await findAll();
  const project = projects.find(({ id }) => id === row.id);
  if (!project) return null;

  const [[students], [cheatsheets], [resources]] = await Promise.all([
    db.query(
      `SELECT students.id, students.name, students.github_username,
              students.avatar_path, student_projects.repo_url
       FROM student_projects
       INNER JOIN students ON students.id = student_projects.student_id
       WHERE student_projects.project_id = ?`,
      [row.id],
    ),
    db.query(
      `SELECT cheatsheets.id, cheatsheets.slug, cheatsheets.title, cheatsheets.file_path
       FROM project_cheatsheets
       INNER JOIN cheatsheets ON cheatsheets.id = project_cheatsheets.cheatsheet_id
       WHERE project_cheatsheets.project_id = ?`,
      [row.id],
    ),
    db.query(
      `SELECT resources.id, resources.title, resources.url
       FROM project_resources
       INNER JOIN resources ON resources.id = project_resources.resource_id
       WHERE project_resources.project_id = ?`,
      [row.id],
    ),
  ]);

  return {
    ...project,
    description: row.description,
    students: students
      .map((student) => ({
        ...student,
        github_url: `https://github.com/${student.github_username}`,
      }))
      .sort(
        (left, right) =>
          compareText(left.name, right.name) ||
          compareText(left.github_username, right.github_username),
      ),
    cheatsheets: cheatsheets.sort(
      (left, right) =>
        compareText(left.title, right.title) ||
        compareText(left.slug, right.slug),
    ),
    resources: resources.sort(
      (left, right) =>
        compareText(left.title, right.title) || left.id - right.id,
    ),
  };
};

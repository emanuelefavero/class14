import { db } from '#/db/db.js';

/** Counts catalog entries independently, without multiplying rows through joins. */
export const getCounts = async () => {
  const [[counts]] = await db.query(`
    SELECT
      (SELECT COUNT(*) FROM students) AS students_count,
      (SELECT COUNT(*) FROM projects) AS projects_count,
      (SELECT COUNT(*) FROM student_projects) AS repositories_count,
      (SELECT COUNT(*) FROM cheatsheets) AS cheatsheets_count,
      (SELECT COUNT(*) FROM resources) AS resources_count
  `);
  return counts;
};

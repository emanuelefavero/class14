import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectCheatsheets } from '../assets/project-cheatsheets.js';
import { projects } from '../assets/projects.js';
import { students } from '../assets/students.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'assets');
const outputPath = path.join(root, 'server/db/setup/seed.sql');
const linksPath = path.join(root, 'server/db/setup/project-cheatsheets.sql');
const resourcesPath = path.join(root, 'server/db/setup/project-resources.sql');

const avatars = JSON.parse(await readFile(path.join(assets, 'student-avatars.json'), 'utf8'));
const studentProjects = JSON.parse(await readFile(path.join(assets, 'student-projects.json'), 'utf8'));
const avatarByGithub = new Map(avatars.map(({ github, path: avatar }) => [github, avatar]));
const studentByGithub = new Map(students.map((student) => [student.github, student]));
const projectBySlug = new Map(projects.map((project) => [project.name, project]));

if (studentByGithub.size !== students.length) throw new Error('Duplicate student username');
if (projectBySlug.size !== projects.length) throw new Error('Duplicate project slug');
if (avatarByGithub.size !== avatars.length) throw new Error('Duplicate avatar username');

const sqlString = (value) => {
  if (typeof value !== 'string' || value.includes('\0')) throw new Error('Invalid SQL string');
  return `'${value.replaceAll("'", "''")}'`;
};

const insert = (table, columns, rows, updates) => {
  const values = rows.map((row) => `  (${row.map(sqlString).join(', ')})`).join(',\n');
  const changes = updates.map((column) => `${column} = VALUES(${column})`).join(', ');
  return `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${values}\nON DUPLICATE KEY UPDATE ${changes};`;
};

const studentRows = [];
for (const { name, github } of students) {
  const avatar = avatarByGithub.get(github);
  if (!avatar) throw new Error(`Missing avatar for ${github}`);
  if (!avatar.startsWith('avatars/') || !(await stat(path.join(assets, avatar)).catch(() => null))) {
    throw new Error(`Avatar file not found for ${github}`);
  }
  studentRows.push([name, github, `/${avatar}`]);
}

const projectRows = [];
for (const { name, tags } of projects) {
  const filename = path.join(assets, 'project-descriptions', `${name}.md`);
  const description = await readFile(filename, 'utf8');
  const headings = [...description.matchAll(/^# (.+)$/gm)];
  if (headings.length !== 1) throw new Error(`Expected one main heading in ${filename}`);
  const title = headings[0][1].replace(/^(Esercizio|Exercise):\s*/i, '').trim();
  if (!title || title.length > 150) throw new Error(`Invalid title in ${filename}`);
  projectRows.push([name, title, description.trim(), tags.join(', ')]);
}

const pdfFiles = (await readdir(path.join(assets, 'cheatsheets')))
  .filter((filename) => filename.endsWith('.pdf'))
  .sort();
const cheatsheetRows = pdfFiles.map((filename) => {
  const slug = filename.slice(0, -4);
  const title = slug
    .split('-')
    .map((part) => ({ api: 'API', crud: 'CRUD', npm: 'NPM', sql: 'SQL', mysql: 'MySQL' })[part] ?? `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(' ');
  return [slug, title, `/cheatsheets/${filename}`];
});

const cheatsheetSlugs = new Set(cheatsheetRows.map(([slug]) => slug));
const linkedCheatsheets = new Set();
const projectCheatsheetStatements = [];

for (const { name } of projects) {
  const slugs = projectCheatsheets[name];
  if (!Array.isArray(slugs) || slugs.length === 0 || new Set(slugs).size !== slugs.length) {
    throw new Error(`Missing or duplicate cheatsheet links for ${name}`);
  }

  for (const slug of slugs) {
    if (!cheatsheetSlugs.has(slug)) throw new Error(`Unknown cheatsheet: ${slug}`);
    linkedCheatsheets.add(slug);
    projectCheatsheetStatements.push(
      `INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)\n` +
      `SELECT projects.id, cheatsheets.id\n` +
      `FROM projects CROSS JOIN cheatsheets\n` +
      `WHERE projects.slug = ${sqlString(name)} AND cheatsheets.slug = ${sqlString(slug)};`,
    );
  }
}

if (Object.keys(projectCheatsheets).length !== projects.length) {
  throw new Error('Cheatsheet mapping contains a project not in projects.js');
}
if (linkedCheatsheets.size !== cheatsheetSlugs.size) {
  throw new Error('A cheatsheet is not linked to any project');
}

const projectTopics = new Set(projects.flatMap(({ tags }) => tags));
const resourceLines = (await readFile(path.join(assets, 'resources.md'), 'utf8')).split('\n');
const resources = [];
let currentTopic = null;

for (const line of resourceLines) {
  const topic = line.match(/^- ([^:]+):$/);
  if (topic) {
    currentTopic = topic[1];
    continue;
  }

  const entry = line.match(/^  - ([^:]+): (https?:\/\/\S+)$/);
  if (!entry || !projectTopics.has(currentTopic)) continue;

  const [, label, url] = entry;
  const title = label.startsWith(`${currentTopic} `) ? label : `${currentTopic} ${label}`;
  if (title.length > 150 || url.length > 255) throw new Error(`Resource is too long: ${url}`);
  resources.push({ topic: currentTopic, label, title, url });
}

if (new Set(resources.map(({ url }) => url)).size !== resources.length) {
  throw new Error('Duplicate resource URL');
}

const resourceRows = resources.map(({ title, url }) => [title, url]);
const resourceStatements = [];
const linkedResources = new Set();

for (const { name, tags } of projects) {
  for (const { topic, label, url } of resources) {
    if (!tags.includes(topic)) continue;
    // The React Router guide belongs to the router exercise, not every React exercise.
    if (label === 'React Router' && name !== 'react-router') continue;

    linkedResources.add(url);
    resourceStatements.push(
      `INSERT IGNORE INTO project_resources (project_id, resource_id)\n` +
      `SELECT projects.id, resources.id\n` +
      `FROM projects CROSS JOIN resources\n` +
      `WHERE projects.slug = ${sqlString(name)} AND resources.url = ${sqlString(url)};`,
    );
  }
}

if (linkedResources.size !== resources.length) {
  throw new Error('A resource is not linked to any project');
}

const seenPairs = new Set();
const associationStatements = studentProjects.map(({ github, project, repoUrl }) => {
  const key = `${github}/${project}`;
  if (!studentByGithub.has(github) || !projectBySlug.has(project) || seenPairs.has(key)) {
    throw new Error(`Invalid or duplicate student/project pair: ${key}`);
  }
  if (repoUrl.toLowerCase() !== `https://github.com/${key}`.toLowerCase()) {
    throw new Error(`Unexpected repository URL for ${key}`);
  }
  seenPairs.add(key);

  const student = sqlString(github);
  const slug = sqlString(project);
  const url = sqlString(repoUrl);
  return `INSERT INTO student_projects (student_id, project_id, repo_url)\nSELECT students.id, projects.id, ${url}\nFROM students CROSS JOIN projects\nWHERE students.github_username = ${student} AND projects.slug = ${slug}\nON DUPLICATE KEY UPDATE repo_url = VALUES(repo_url);`;
});

const sql = [
  '-- Generated from assets/ by node scripts/generate-seed.mjs. Do not edit by hand.',
  '-- Run schema.sql first. Re-running this file updates rows with the same natural key.',
  'USE class14;',
  'SET NAMES utf8mb4;',
  'SET @OLD_SQL_MODE = @@SQL_MODE;',
  "SET SQL_MODE = 'NO_BACKSLASH_ESCAPES';",
  'START TRANSACTION;',
  insert('students', ['name', 'github_username', 'avatar_path'], studentRows, ['name', 'avatar_path']),
  insert('projects', ['slug', 'title', 'description', 'topics'], projectRows, ['title', 'description', 'topics']),
  insert('cheatsheets', ['slug', 'title', 'file_path'], cheatsheetRows, ['title', 'file_path']),
  insert('resources', ['title', 'url'], resourceRows, ['title']),
  '-- Only verified, exact public repository URLs are included.',
  ...associationStatements,
  '-- Curated project-to-PDF links; also available separately in project-cheatsheets.sql.',
  ...projectCheatsheetStatements,
  '-- Topic-based project-to-resource links; also available separately in project-resources.sql.',
  ...resourceStatements,
  'COMMIT;',
  'SET SQL_MODE = @OLD_SQL_MODE;',
  '',
].join('\n\n');

const linksSql = [
  '-- Generated from assets/project-cheatsheets.js by node scripts/generate-seed.mjs.',
  '-- Run after the existing Class14 seed to add PDF links without re-importing other data.',
  'USE class14;',
  'START TRANSACTION;',
  ...projectCheatsheetStatements,
  'COMMIT;',
  '',
].join('\n\n');

const resourcesSql = [
  '-- Generated from assets/resources.md by node scripts/generate-seed.mjs.',
  '-- Run schema.sql first. This file adds only resources and project-resource links.',
  'USE class14;',
  'START TRANSACTION;',
  insert('resources', ['title', 'url'], resourceRows, ['title']),
  ...resourceStatements,
  'COMMIT;',
  '',
].join('\n\n');

if (process.argv.includes('--check')) {
  const current = await readFile(outputPath, 'utf8');
  const currentLinks = await readFile(linksPath, 'utf8');
  const currentResources = await readFile(resourcesPath, 'utf8');
  if (current !== sql || currentLinks !== linksSql || currentResources !== resourcesSql) {
    throw new Error('Generated SQL is out of date; run node scripts/generate-seed.mjs');
  }
  console.log(`Seed is current: ${students.length} students, ${projects.length} projects, ${pdfFiles.length} PDFs, ${studentProjects.length} repositories, ${projectCheatsheetStatements.length} PDF links, ${resources.length} resources, ${resourceStatements.length} resource links`);
} else {
  await writeFile(outputPath, sql);
  await writeFile(linksPath, linksSql);
  await writeFile(resourcesPath, resourcesSql);
  console.log(`Generated seed: ${students.length} students, ${projects.length} projects, ${pdfFiles.length} PDFs, ${studentProjects.length} repositories, ${projectCheatsheetStatements.length} PDF links, ${resources.length} resources, ${resourceStatements.length} resource links`);
}

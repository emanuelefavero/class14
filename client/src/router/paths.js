import { generatePath } from 'react-router';

/** Canonical route patterns and paths. */
export const paths = Object.freeze({
  home: '/',
  topics: '/topics',
  projects: '/projects',
  project: '/projects/:slug',
  students: '/students',
  student: '/students/:github_username',
  topic: '/topics/:name',
  cheatsheets: '/cheatsheets',
  resources: '/resources',
  resourcesNew: '/resources/new',
});

/** Build concrete paths for routes with dynamic segments. */
export const getPath = {
  project: (slug) => generatePath(paths.project, { slug }),
  student: (github_username) =>
    generatePath(paths.student, { github_username }),
  topic: (name) => generatePath(paths.topic, { name }),
};

export const navLinks = [
  { to: paths.topics, label: 'Argomenti' },
  { to: paths.projects, label: 'Progetti' },
  { to: paths.students, label: 'Studenti' },
];

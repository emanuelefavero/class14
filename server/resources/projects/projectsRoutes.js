import { index, show } from './projectsController.js';

export const registerProjects = (app) => {
  app.get('/api/projects', index);
  app.get('/api/projects/:slug', show);
};

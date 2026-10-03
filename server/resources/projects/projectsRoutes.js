import { index, show } from './projectsController.js';

export const registerProjects = (app) => {
  app.route('/api/projects').get(index);
  app.route('/api/projects/:slug').get(show);
};

import { index } from './resourcesController.js';

export const registerResources = (app) => {
  app.get('/api/resources', index);
};

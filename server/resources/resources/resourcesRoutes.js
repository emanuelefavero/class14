import { index, store } from './resourcesController.js';

export const registerResources = (app) => {
  app.get('/api/resources', index);
  app.post('/api/resources', store);
};

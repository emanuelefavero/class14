import { index, store } from './resourcesController.js';

export const registerResources = (app) => {
  app.route('/api/resources').get(index).post(store);
};

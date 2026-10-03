import { destroy, index, store } from './resourcesController.js';

export const registerResources = (app) => {
  app.route('/api/resources').get(index).post(store);
  app.route('/api/resources/:id').delete(destroy);
};

import { requireAdmin } from '#app/middleware/index.js';
import { destroy, index, store } from './resourcesController.js';

export const registerResources = (app) => {
  app.route('/api/resources').get(index).post(requireAdmin, store);
  app.route('/api/resources/:id').delete(requireAdmin, destroy);
};

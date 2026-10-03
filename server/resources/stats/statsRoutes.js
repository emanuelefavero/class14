import { index } from './statsController.js';

export const registerStats = (app) => {
  app.route('/api/stats').get(index);
};

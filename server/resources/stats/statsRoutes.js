import { index } from './statsController.js';

export const registerStats = (app) => {
  app.get('/api/stats', index);
};

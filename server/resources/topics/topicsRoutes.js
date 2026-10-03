import { index, show } from './topicsController.js';

export const registerTopics = (app) => {
  app.route('/api/topics').get(index);
  app.route('/api/topics/:name').get(show);
};

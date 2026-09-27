import { index, show } from './topicsController.js';

export const registerTopics = (app) => {
  app.get('/api/topics', index);
  app.get('/api/topics/:name', show);
};

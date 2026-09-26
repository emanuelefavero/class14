import { index } from './rootController.js';

export const registerRoot = (app) => {
  app.get('/', index);
};

import { index } from './cheatsheetsController.js';

export const registerCheatsheets = (app) => {
  app.route('/api/cheatsheets').get(index);
};

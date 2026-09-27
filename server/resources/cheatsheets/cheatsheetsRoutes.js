import { index } from './cheatsheetsController.js';

export const registerCheatsheets = (app) => {
  app.get('/api/cheatsheets', index);
};

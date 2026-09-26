import { index, unavailable } from './errorsController.js';

export const registerErrors = (app) => {
  app.route('/errors').get(index);
  app.route('/errors/unavailable').get(unavailable);
};

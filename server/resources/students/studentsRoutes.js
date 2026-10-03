import { index, show } from './studentsController.js';

export const registerStudents = (app) => {
  app.route('/api/students').get(index);
  app.route('/api/students/:github_username').get(show);
};

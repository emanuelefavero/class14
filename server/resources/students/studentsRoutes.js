import { index, show } from './studentsController.js';

export const registerStudents = (app) => {
  app.get('/api/students', index);
  app.get('/api/students/:github_username', show);
};

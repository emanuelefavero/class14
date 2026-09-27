import { catalogQuerySchema } from '#/schemas/querySchemas.js';
import * as studentsRepository from './studentsRepository.js';
import { studentParamsSchema } from './studentsSchemas.js';

export const index = async (req, res) => {
  const result = catalogQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const students = await studentsRepository.findAll({
    search: result.data.q,
    topic: result.data.topic,
  });
  return res.json(students);
};

export const show = async (req, res) => {
  const params = studentParamsSchema.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const student = await studentsRepository.findByUsername(
    params.data.github_username,
  );
  if (!student) return res.status(404).json({ message: 'Student not found' });
  return res.json(student);
};

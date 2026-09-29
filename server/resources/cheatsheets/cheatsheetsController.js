import { catalogQuerySchema } from '#app/schemas/querySchemas.js';
import * as cheatsheetsRepository from './cheatsheetsRepository.js';

export const index = async (req, res) => {
  const result = catalogQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const cheatsheets = await cheatsheetsRepository.findAll({
    search: result.data.q,
    topic: result.data.topic,
  });
  return res.json(cheatsheets);
};

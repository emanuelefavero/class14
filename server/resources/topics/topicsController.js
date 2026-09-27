import * as topicsRepository from './topicsRepository.js';
import { topicParamsSchema } from './topicsSchemas.js';

export const index = async (req, res) => {
  const topics = await topicsRepository.findAll();
  return res.json(topics);
};

export const show = async (req, res) => {
  const params = topicParamsSchema.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }
  const topic = await topicsRepository.findByName(params.data.name);
  if (!topic) return res.status(404).json({ message: 'Topic not found' });
  return res.json(topic);
};

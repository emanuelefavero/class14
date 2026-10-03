import { catalogQuerySchema } from '#app/schemas/querySchemas.js';
import * as resourcesRepository from './resourcesRepository.js';
import {
  createResourceSchema,
  resourceParamsSchema,
} from './resourcesSchemas.js';

export const index = async (req, res) => {
  const result = catalogQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const resources = await resourcesRepository.findAll({
    search: result.data.q,
    topic: result.data.topic,
  });
  return res.json(resources);
};

export const store = async (req, res) => {
  const result = createResourceSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const creation = await resourcesRepository.create(result.data);

  if (creation.outcome === 'project_not_found') {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (creation.outcome === 'duplicate_url') {
    return res.status(409).json({ message: 'Resource URL already exists' });
  }

  return res.status(201).json(creation.resource);
};

export const destroy = async (req, res) => {
  const params = resourceParamsSchema.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const removed = await resourcesRepository.removeById(params.data.id);
  if (!removed) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  return res.status(204).send();
};

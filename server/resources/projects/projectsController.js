import * as projectsRepository from './projectsRepository.js';
import {
  projectDetailQuerySchema,
  projectParamsSchema,
  projectQuerySchema,
} from './projectsSchemas.js';

export const index = async (req, res) => {
  const result = projectQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const projects = await projectsRepository.findAll({
    search: result.data.q,
    topic: result.data.topic,
  });
  return res.json(projects);
};

export const show = async (req, res) => {
  const params = projectParamsSchema.safeParse(req.params);
  const query = projectDetailQuerySchema.safeParse(req.query);
  if (!params.success || !query.success) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const project = await projectsRepository.findBySlug(params.data.slug);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  return res.json(project);
};

import * as rootRepository from './rootRepository.js';

export const index = (req, res) => res.json(rootRepository.getOverview());

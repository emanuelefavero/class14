import * as statsRepository from './statsRepository.js';

export const index = async (req, res) => {
  const counts = await statsRepository.getCounts();
  return res.json(counts);
};

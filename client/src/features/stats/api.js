import { fetchData } from '@/lib/api';
import { statsSchema } from './schemas';

export const fetchStats = () =>
  fetchData('/api/stats').then((data) => statsSchema.parse(data));

import { postData } from '@/lib/api';
import { resourceSchema } from './schemas';

export const createResource = (payload, adminKey) =>
  postData('/api/resources', payload, {
    headers: { Authorization: `Bearer ${adminKey}` },
  }).then((data) => resourceSchema.parse(data));

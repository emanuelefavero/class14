import { postData } from '@/lib/api';
import { resourceSchema } from './schemas';

export const createResource = (payload) =>
  postData('/api/resources', payload).then((data) =>
    resourceSchema.parse(data),
  );

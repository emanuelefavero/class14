import { postData } from '@/lib/api';
import { resourceSchema } from './schemas';

/**
 * Sends the admin key only in the authorization header and validates the created resource returned by the API.
 * @example
 * const resource = await createResource(payload, adminKey);
 * // { id, title, url, projects: [{ id, slug, title, topics }] }
 */
export const createResource = (payload, adminKey) =>
  postData('/api/resources', payload, {
    headers: { Authorization: `Bearer ${adminKey}` },
  }).then((data) => resourceSchema.parse(data));

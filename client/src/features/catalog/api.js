import { fetchData } from '@/lib/api';
import {
  cheatsheetsSchema,
  projectSchema,
  projectsSchema,
  resourcesSchema,
  studentSchema,
  studentsSchema,
  topicSchema,
  topicsSchema,
} from './schemas';

const get = (url, schema, query = '') => {
  const requestUrl = query ? `${url}?${query}` : url;
  return fetchData(requestUrl).then((data) => schema.parse(data));
};

export const fetchProjects = (query) =>
  get('/api/projects', projectsSchema, query);
export const fetchProject = (slug) =>
  get(`/api/projects/${encodeURIComponent(slug)}`, projectSchema);
export const fetchTopics = () => get('/api/topics', topicsSchema);
export const fetchTopic = (name) =>
  get(`/api/topics/${encodeURIComponent(name)}`, topicSchema);
export const fetchStudents = (query) =>
  get('/api/students', studentsSchema, query);
export const fetchStudent = (username) =>
  get(`/api/students/${encodeURIComponent(username)}`, studentSchema);
export const fetchCheatsheets = (query) =>
  get('/api/cheatsheets', cheatsheetsSchema, query);
export const fetchResources = (query) =>
  get('/api/resources', resourcesSchema, query);

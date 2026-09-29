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

const get = (url, schema) => fetchData(url).then((data) => schema.parse(data));

export const fetchProjects = () => get('/api/projects', projectsSchema);
export const fetchProject = (slug) =>
  get(`/api/projects/${encodeURIComponent(slug)}`, projectSchema);
export const fetchTopics = () => get('/api/topics', topicsSchema);
export const fetchTopic = (name) =>
  get(`/api/topics/${encodeURIComponent(name)}`, topicSchema);
export const fetchStudents = () => get('/api/students', studentsSchema);
export const fetchStudent = (username) =>
  get(`/api/students/${encodeURIComponent(username)}`, studentSchema);
export const fetchCheatsheets = () =>
  get('/api/cheatsheets', cheatsheetsSchema);
export const fetchResources = () => get('/api/resources', resourcesSchema);

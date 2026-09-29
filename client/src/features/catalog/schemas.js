import { z } from 'zod';

const projectSummary = z.object({
  id: z.number().int().positive(),
  slug: z.string(),
  title: z.string(),
  topics: z.array(z.string()),
});

const studentSummary = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  github_username: z.string(),
  github_url: z.url(),
  avatar_path: z.string().nullable(),
});

const cheatsheetSummary = z.object({
  id: z.number().int().positive(),
  slug: z.string(),
  title: z.string(),
  file_path: z.string(),
});

const resourceSummary = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  url: z.url(),
});

export const projectsSchema = z.array(projectSummary);
export const projectSchema = projectSummary.extend({
  description: z.string().nullable(),
  students: z.array(studentSummary.extend({ repo_url: z.url() })),
  cheatsheets: z.array(cheatsheetSummary),
  resources: z.array(resourceSummary),
});

export const topicsSchema = z.array(
  z.object({
    name: z.string(),
    project_count: z.number().int().nonnegative(),
  }),
);
export const topicSchema = z.object({
  name: z.string(),
  project_count: z.number().int().nonnegative(),
  projects: projectsSchema,
  related_cheatsheets: z.array(cheatsheetSummary),
  related_resources: z.array(resourceSummary),
});

export const studentsSchema = z.array(studentSummary);
export const studentSchema = studentSummary.extend({
  projects: z.array(projectSummary.extend({ repo_url: z.url() })),
  repository_count: z.number().int().nonnegative(),
  topics: z.array(z.string()),
});

export const cheatsheetsSchema = z.array(
  cheatsheetSummary.extend({ projects: projectsSchema }),
);
export const resourcesSchema = z.array(
  resourceSummary.extend({ projects: projectsSchema }),
);

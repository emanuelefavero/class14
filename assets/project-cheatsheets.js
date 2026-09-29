// Project slug -> relevant PDF slugs. Keep these links explicit because the
// current project tags (for example, "React") are too broad for every PDF.
export const projectCheatsheets = {
  'express-blog-sql': [
    'database-appunti',
    'mysql-comandi-base',
    'mysql-queries',
    'node-express-sintesi',
    'express-appunti',
    'express-crud',
  ],
  'db-university': [
    'database-appunti',
    'mysql-comandi-base',
    'mysql-queries',
  ],
  'db-first': ['database-appunti'],
  'express-blog-api-crud': [
    'express-crud',
    'express-rest-api',
    'express-appunti',
  ],
  'express-blog-routing': ['express-rest-api', 'express-appunti'],
  'express-blog-intro': ['node-express-sintesi', 'express-appunti'],
  'node-hello-world': ['node-npm', 'node-npm-appunti'],
  'react-context-api': [
    'react-props',
    'react-use-state',
    'react-use-effect',
    'react-fetch',
  ],
  'react-router': ['react-router', 'react-fetch', 'fetch-axios'],
  'react-api': ['react-fetch', 'fetch-axios', 'react-use-effect'],
  'react-movie-filter': ['react-use-state', 'react-use-effect'],
  'react-form': ['react-use-state', 'react-props'],
  'react-use-state': ['react-use-state'],
  'react-dc-comics': ['react-props', 'react-classname'],
  'react-hello-world': ['node-vite', 'node-npm-vite', 'react-classname'],
};

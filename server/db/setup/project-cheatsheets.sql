-- Generated from assets/project-cheatsheets.js by node scripts/generate-seed.mjs.

-- Run after the existing Class14 seed to add PDF links without re-importing other data.

USE class14;

START TRANSACTION;

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'database-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'mysql-comandi-base';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'mysql-queries';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'node-express-sintesi';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'express-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-sql' AND cheatsheets.slug = 'express-crud';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'db-university' AND cheatsheets.slug = 'database-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'db-university' AND cheatsheets.slug = 'mysql-comandi-base';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'db-university' AND cheatsheets.slug = 'mysql-queries';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'db-first' AND cheatsheets.slug = 'database-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-api-crud' AND cheatsheets.slug = 'express-crud';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-api-crud' AND cheatsheets.slug = 'express-rest-api';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-api-crud' AND cheatsheets.slug = 'express-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-routing' AND cheatsheets.slug = 'express-rest-api';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-routing' AND cheatsheets.slug = 'express-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-intro' AND cheatsheets.slug = 'node-express-sintesi';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'express-blog-intro' AND cheatsheets.slug = 'express-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'node-hello-world' AND cheatsheets.slug = 'node-npm';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'node-hello-world' AND cheatsheets.slug = 'node-npm-appunti';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-context-api' AND cheatsheets.slug = 'react-props';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-context-api' AND cheatsheets.slug = 'react-use-state';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-context-api' AND cheatsheets.slug = 'react-use-effect';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-context-api' AND cheatsheets.slug = 'react-fetch';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-router' AND cheatsheets.slug = 'react-router';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-router' AND cheatsheets.slug = 'react-fetch';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-router' AND cheatsheets.slug = 'fetch-axios';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-api' AND cheatsheets.slug = 'react-fetch';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-api' AND cheatsheets.slug = 'fetch-axios';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-api' AND cheatsheets.slug = 'react-use-effect';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-movie-filter' AND cheatsheets.slug = 'react-use-state';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-movie-filter' AND cheatsheets.slug = 'react-use-effect';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-form' AND cheatsheets.slug = 'react-use-state';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-form' AND cheatsheets.slug = 'react-props';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-use-state' AND cheatsheets.slug = 'react-use-state';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-dc-comics' AND cheatsheets.slug = 'react-props';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-dc-comics' AND cheatsheets.slug = 'react-classname';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-hello-world' AND cheatsheets.slug = 'node-vite';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-hello-world' AND cheatsheets.slug = 'node-npm-vite';

INSERT IGNORE INTO project_cheatsheets (project_id, cheatsheet_id)
SELECT projects.id, cheatsheets.id
FROM projects CROSS JOIN cheatsheets
WHERE projects.slug = 'react-hello-world' AND cheatsheets.slug = 'react-classname';

COMMIT;


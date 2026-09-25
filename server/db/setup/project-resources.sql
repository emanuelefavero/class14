-- Generated from assets/resources.md by node scripts/generate-seed.mjs.

-- Run schema.sql first. This file adds only resources and project-resource links.

USE class14;

START TRANSACTION;

INSERT INTO resources (title, url) VALUES
  ('mysql2 Documentation', 'https://sidorares.github.io/node-mysql2/docs'),
  ('MySQL Documentation', 'https://dev.mysql.com/doc/'),
  ('MySQL Tutorial', 'https://www.w3schools.com/MYSQL/default.asp'),
  ('MySQL Workbench download', 'https://dev.mysql.com/downloads/workbench/'),
  ('MySQL Community server download', 'https://dev.mysql.com/downloads/mysql/'),
  ('Database DrawSQL', 'https://drawsql.app/'),
  ('Express Documentation', 'https://expressjs.com/en/5x/starter/installing/'),
  ('Express Tutorial', 'https://www.w3schools.com/nodejs/nodejs_express.asp'),
  ('Express REST', 'https://restfulapi.net/'),
  ('Express HTTP', 'https://developer.mozilla.org/en-US/docs/Web/HTTP'),
  ('Node.js Documentation', 'https://nodejs.org/en/docs/'),
  ('Node.js Tutorial', 'https://www.w3schools.com/nodejs/default.asp'),
  ('NPM Documentation', 'https://docs.npmjs.com/about-npm'),
  ('NPM Tutorial', 'https://www.w3schools.com/nodejs/nodejs_npm.asp'),
  ('React Documentation', 'https://reactjs.org/docs/getting-started.html'),
  ('React Tutorial', 'https://www.w3schools.com/react/'),
  ('React Router', 'https://reactrouter.com/')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://sidorares.github.io/node-mysql2/docs';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://dev.mysql.com/doc/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://www.w3schools.com/MYSQL/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://dev.mysql.com/downloads/workbench/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://dev.mysql.com/downloads/mysql/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://expressjs.com/en/5x/starter/installing/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://restfulapi.net/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-sql' AND resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-university' AND resources.url = 'https://dev.mysql.com/doc/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-university' AND resources.url = 'https://www.w3schools.com/MYSQL/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-university' AND resources.url = 'https://dev.mysql.com/downloads/workbench/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-university' AND resources.url = 'https://dev.mysql.com/downloads/mysql/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-university' AND resources.url = 'https://drawsql.app/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'db-first' AND resources.url = 'https://drawsql.app/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://expressjs.com/en/5x/starter/installing/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://restfulapi.net/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://nodejs.org/en/docs/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-api-crud' AND resources.url = 'https://www.w3schools.com/nodejs/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://expressjs.com/en/5x/starter/installing/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://restfulapi.net/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://nodejs.org/en/docs/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-routing' AND resources.url = 'https://www.w3schools.com/nodejs/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://expressjs.com/en/5x/starter/installing/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://restfulapi.net/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://nodejs.org/en/docs/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'express-blog-intro' AND resources.url = 'https://www.w3schools.com/nodejs/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'node-hello-world' AND resources.url = 'https://nodejs.org/en/docs/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'node-hello-world' AND resources.url = 'https://www.w3schools.com/nodejs/default.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'node-hello-world' AND resources.url = 'https://docs.npmjs.com/about-npm';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'node-hello-world' AND resources.url = 'https://www.w3schools.com/nodejs/nodejs_npm.asp';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-context-api' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-context-api' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-router' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-router' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-router' AND resources.url = 'https://reactrouter.com/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-api' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-api' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-movie-filter' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-movie-filter' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-form' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-form' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-use-state' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-use-state' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-dc-comics' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-dc-comics' AND resources.url = 'https://www.w3schools.com/react/';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-hello-world' AND resources.url = 'https://reactjs.org/docs/getting-started.html';

INSERT IGNORE INTO project_resources (project_id, resource_id)
SELECT projects.id, resources.id
FROM projects CROSS JOIN resources
WHERE projects.slug = 'react-hello-world' AND resources.url = 'https://www.w3schools.com/react/';

COMMIT;


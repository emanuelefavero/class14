import databaseIcon from '@/assets/icons/database-icon.svg';
import expressIcon from '@/assets/icons/express-icon.svg';
import mysqlIcon from '@/assets/icons/mysql-icon.svg';
import nodejsIcon from '@/assets/icons/nodejs-icon.svg';
import npmIcon from '@/assets/icons/npm-icon.svg';
import reactIcon from '@/assets/icons/react-icon.svg';

const topicIcons = new Map([
  ['database', databaseIcon],
  ['express', expressIcon],
  ['mysql', mysqlIcon],
  ['mysql2', mysqlIcon],
  ['node.js', nodejsIcon],
  ['npm', npmIcon],
  ['react', reactIcon],
]);

const projectIcons = new Map([
  ['express-blog-sql', mysqlIcon],
  ['db-university', mysqlIcon],
  ['db-first', databaseIcon],
  ['express-blog-api-crud', expressIcon],
  ['express-blog-routing', expressIcon],
  ['express-blog-intro', expressIcon],
  ['node-hello-world', nodejsIcon],
  ['react-context-api', reactIcon],
  ['react-router', reactIcon],
  ['react-api', reactIcon],
  ['react-movie-filter', reactIcon],
  ['react-form', reactIcon],
  ['react-use-state', reactIcon],
  ['react-dc-comics', reactIcon],
  ['react-hello-world', reactIcon],
]);

export const getTopicIcon = (name) =>
  topicIcons.get(name.toLowerCase()) ?? null;

export const getProjectIcon = (slug) => projectIcons.get(slug) ?? null;

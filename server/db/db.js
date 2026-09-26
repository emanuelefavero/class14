import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

export const db = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: env.DB_CONNECTION_LIMIT,
  connectTimeout: env.DB_CONNECT_TIMEOUT,
  queueLimit: 0,
});

import path from 'node:path';
import express from 'express';
import { env } from './config/env.js';
import { db } from './db/db.js';
import * as middleware from './middleware/index.js';
import {
  registerErrors,
  registerPosts,
  registerRoot,
} from './resources/index.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, 'public')));

registerPosts(app);
registerRoot(app);
registerErrors(app);

app.use(middleware.notFound); // 404
app.use(middleware.errorHandler); // Error handler

const startServer = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Database connection successful');

    const server = app.listen(env.PORT, (error) => {
      if (error) return;
      console.log(`Class14 API running at http://localhost:${env.PORT}/`);
    });

    server.on('error', async (error) => {
      console.error(
        'Unable to start Class14 API:',
        error.code ?? 'LISTEN_ERROR',
      );
      await db.end();
      process.exitCode = 1;
    });
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error.code ?? 'DB_CONNECTION_ERROR',
    );
    await db.end();
    process.exitCode = 1;
  }
};

startServer();

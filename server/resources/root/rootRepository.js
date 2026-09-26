import path from 'node:path';
import { readJsonFile } from '#/utils/json.js';

const rootFilePath = path.join(import.meta.dirname, '../../data/root.json');

const readRoot = () => readJsonFile(rootFilePath);

export const getOverview = () => readRoot();

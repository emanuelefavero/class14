import fs from 'node:fs';

export const readJsonFile = (filePath) => {
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
};

export const writeJsonFile = (filePath, data) => {
  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync(filePath, `${json}\n`);
};

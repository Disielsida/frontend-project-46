/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const workDir = process.cwd();
  const fullPath = path.resolve(workDir, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filePath) => filePath.split('.')[1];

export { readFile, getExtension };

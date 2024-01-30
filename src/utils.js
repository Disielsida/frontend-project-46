import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readFile = (filePath) => {
  const workDir = process.cwd();
  const fullPath = path.resolve(workDir, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filePath) => filePath.split('.')[1];

const getParse = (dataFile, extensionFile) => {
  switch (extensionFile) {
    case 'json':
      return JSON.parse(dataFile);
    case 'yaml':
      return yaml.load(dataFile);
    case 'yml':
      return yaml.load(dataFile);
    default:
      throw new Error(`Unknown extension! This extansion: ${extensionFile}, dataFile: ${dataFile}`);
  }
};
export { readFile, getExtension, getParse };

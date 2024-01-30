import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => {
  const workDir = process.cwd();
  const fullPath = path.resolve(workDir, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filePath) => filePath.split('.')[1];

const getDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const diffLines = sortedKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return `    ${key}: ${obj1[key]}`;
      }
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (_.has(obj1, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    return `  + ${key}: ${obj2[key]}`;
  });
  return `{\n${diffLines.join('\n')}\n}`;
};

export { readFile, getExtension, getDiff };

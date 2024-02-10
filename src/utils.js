/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const workDir = process.cwd();
  const fullPath = path.resolve(workDir, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filePath) => filePath.split('.')[1];

const array = [
  {
    key: 'common',
    children: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object],
    ],
    status: 'nested',
  },
  {
    key: 'group1',
    children: [[Object], [Object], [Object]],
    status: 'nested',
  },
  {
    key: 'group2',
    value: { abc: 12345, deep: [Object] },
    status: 'added',
  },
  {
    key: 'group3',
    value: { deep: [Object], fee: 100500 },
    status: 'deleted',
  },
];
export { readFile, getExtension };

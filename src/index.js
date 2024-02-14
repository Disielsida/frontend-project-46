import fs from 'fs';
import path from 'path';
import getDiff from './getDifference.js';
import parseData from './parsers.js';
import getFormat from './formatters/index.js';

const readFile = (filePath) => {
  const workDir = process.cwd();
  const fullPath = path.resolve(workDir, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filePath) => filePath.split('.')[1];

function getData(filePath1, filePath2) {
  const dataFile1 = readFile(filePath1);
  const dataFile2 = readFile(filePath2);
  const extensionFile1 = getExtension(filePath1);
  const extensionFile2 = getExtension(filePath2);
  const parseFile1 = parseData(dataFile1, extensionFile1);
  const parseFile2 = parseData(dataFile2, extensionFile2);
  return { parseFile1, parseFile2 };
}

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const { parseFile1, parseFile2 } = getData(filePath1, filePath2);
  const diffObject = getDiff(parseFile1, parseFile2);
  const result = getFormat(diffObject, formatName);
  return result;
};

export default genDiff;

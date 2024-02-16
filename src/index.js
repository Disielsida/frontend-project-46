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

function getData(filePath) {
  const dataFile = readFile(filePath);
  const extensionFile = getExtension(filePath);
  const parseFile = parseData(dataFile, extensionFile);
  return parseFile;
}

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const parseFile1 = getData(filePath1);
  const parseFile2 = getData(filePath2);
  const diffObject = getDiff(parseFile1, parseFile2);
  const result = getFormat(diffObject, formatName);
  return result;
};

export default genDiff;

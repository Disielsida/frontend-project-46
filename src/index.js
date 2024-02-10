import { readFile, getExtension } from './utils.js';
import getDiff from './getDifference.js';
import getParse from './parsers.js';
import getFormat from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const dataFile1 = readFile(filePath1);
  const dataFile2 = readFile(filePath2);
  const extensionFile1 = getExtension(filePath1);
  const extensionFile2 = getExtension(filePath2);
  const parseFile1 = getParse(dataFile1, extensionFile1);
  const parseFile2 = getParse(dataFile2, extensionFile2);
  const diffObject = getDiff(parseFile1, parseFile2);
  const result = getFormat(diffObject, formatName);
  return result;
};

export default genDiff;

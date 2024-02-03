import { readFile, getExtension, getDiff } from './utils.js';
import getParse from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const dataFile1 = readFile(filePath1);
  const dataFile2 = readFile(filePath2);
  const extensionFile1 = getExtension(filePath1);
  const extensionFile2 = getExtension(filePath2);
  const parseFile1 = getParse(dataFile1, extensionFile1);
  const parseFile2 = getParse(dataFile2, extensionFile2);
  return getDiff(parseFile1, parseFile2);
};

export default genDiff;

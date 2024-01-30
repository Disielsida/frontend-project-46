import { readFile, getExtension, getParse } from './utils.js';

const genDiff = (filePath1, filePath2) => {
  const dataFile1 = readFile(filePath1);
  const dataFile2 = readFile(filePath2);
  const extensionFile1 = getExtension(filePath1);
  const extensionFile2 = getExtension(filePath2);
  const parseFile1 = getParse(dataFile1, extensionFile1);
  const parseFile2 = getParse(dataFile2, extensionFile2);
  return `${parseFile1.host} ${parseFile2.verbose}!!!`;
};

export default genDiff;

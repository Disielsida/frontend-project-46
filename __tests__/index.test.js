import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFileName = fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFileName);

const getFixturePath = (fileName) => path.join(currentDirName, '..', '__fixtures__', fileName);
const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

describe.each(['stylish', 'plain', 'json'])('gendiffs flow with %s format', (format) => {
  test.each(['json', 'yaml'])('with %s files', (extension) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);
    const expectedOutput = readFixture(`expected_file_${format}.txt`);

    expect(genDiff(filePath1, filePath2, format)).toEqual(expectedOutput);
  });
});

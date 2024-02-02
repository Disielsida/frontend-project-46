import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFileName = fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFileName);

const getFixturePath = (fileName) => path.join(currentDirName, '..', '__fixtures__', fileName);
const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test("gendiffs's main flow", () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFixture('expected_file.txt'));
});

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFileName = fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFileName);

const getFixturePath = (fileName) => path.join(currentDirName, '..', '__fixtures__', fileName);
const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test("gendiffs's main flow with json", () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFixture('expected_file_stylish.txt'));
});

test("gendiffs's main flow with yaml/yml", () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(readFixture('expected_file_stylish.txt'));
});

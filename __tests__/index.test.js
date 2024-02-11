import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFileName = fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFileName);

const getFixturePath = (fileName) => path.join(currentDirName, '..', '__fixtures__', fileName);
const readFixture = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test("gendiffs's main flow with json", () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFixture('expected_file_stylish.txt'));
});

test("gendiffs's main flow with yaml/yml", () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toEqual(readFixture('expected_file_stylish.txt'));
});

test("gendiffs's plain flow with json", () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFixture('expected_file_plain.txt'));
});

test("gendiffs's plain flow with yaml/yml", () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(readFixture('expected_file_plain.txt'));
});

install:
	npm ci

publish:
	npm publish --dry-run

lint: 
	npx eslint .

gendiff:
	bin/gendiff.js

test:
	npx jest

test-coverage:
	npx jest --coverage

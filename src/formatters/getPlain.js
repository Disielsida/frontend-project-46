import _ from 'lodash';

const getData = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (diffObject) => {
  const iter = (node, depth) => {
    const lines = Object.entries(node).map(([key, {
      status, value, children, value1, value2,
    }]) => {
      switch (status) {
        case 'nested':
          return iter(children, `${depth}${key}.`);
        case 'added':
          return `Property '${depth + key}' was added with value: ${getData(value)}`;
        case 'deleted':
          return `Property '${depth + key}' was removed`;
        case 'changed':
          return `Property '${depth + key}' was updated. From ${getData(value1)} to ${getData(value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    }).filter((line) => line !== null);
    return `${lines.join('\n')}`;
  };
  return iter(diffObject, '');
};

export default getPlain;

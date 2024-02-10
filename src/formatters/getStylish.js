import _ from 'lodash';

const getData = (node, depth) => {
  const separator = '  ';
  if (!_.isPlainObject(node)) {
    return node;
  }
  const keys = Object.keys(node);
  const result = keys.map((key) => `${separator.repeat(depth + 1)}${key}: ${getData(node[key], depth + 2)}`);
  return `{\n${result.join('\n')}\n${separator.repeat(depth - 1)}}`;
};

const getStylish = (diffObject) => {
  const separator = '  ';
  const iter = (node, depth) => {
    const lines = Object.entries(node).map(([key, {
      status, value, children, value1, value2,
    }]) => {
      switch (status) {
        case 'nested':
          return `${separator.repeat(depth)}  ${key}: ${iter(children, depth + 2)}`;
        case 'added':
          return `${separator.repeat(depth)}+ ${key}: ${getData(value, depth + 2)}`;
        case 'deleted':
          return `${separator.repeat(depth)}- ${key}: ${getData(value, depth + 2)}`;
        case 'changed':
          return [
            `${separator.repeat(depth)}- ${key}: ${getData(value1, depth + 2)}`,
            `${separator.repeat(depth)}+ ${key}: ${getData(value2, depth + 2)}`,
          ].join('\n');
        case 'unchanged':
          return `${separator.repeat(depth)}  ${key}: ${getData(value, depth + 2)}`;
        default:
          throw new Error(`Unknown type: ${status}`);
      }
    });
    return `{\n${lines.join('\n')}\n${separator.repeat(depth - 1)}}`;
  };
  return iter(diffObject, 1);
};

export default getStylish;

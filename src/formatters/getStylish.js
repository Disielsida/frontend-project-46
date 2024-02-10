import _ from 'lodash';

const getData = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKeys = value[key];
    return `${key}: ${getData(newKeys)}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

const getStylish = (diffObject) => {
  const separator = ' ';
  const iter = (node, depth) => {
    const lines = Object.entries(node).map(([key, {
      status, value, children, value1, value2,
    }]) => {
      switch (status) {
        case 'nested':
          return `${separator.repeat(depth)}${key}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${separator.repeat(depth)}+ ${key}: ${getData(value)}`;
        case 'deleted':
          return `${separator.repeat(depth)}- ${key}: ${getData(value)}`;
        case 'changed':
          return [
            `${separator.repeat(depth)}- ${key}: ${getData(value1)}`,
            `${separator.repeat(depth)}+ ${key}: ${getData(value2)}`,
          ].join('\n');
        case 'unchanged':
          return `${separator.repeat(depth)}  ${key}: ${value}`;
        default:
          throw new Error(`Unknown type: ${status}`);
      }
    });
    return `{\n${lines.filter((line) => line !== '').join('\n')}\n${separator.repeat(depth - 1)}}`;
  };
  return iter(diffObject, 1);
};

export default getStylish;

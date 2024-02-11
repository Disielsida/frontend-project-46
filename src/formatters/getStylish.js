import _ from 'lodash';

const getSpacing = (depth) => {
  const space = ' ';
  const indent = 4;
  const remover = 2;
  return space.repeat((depth * indent) - remover);
};

const getData = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return node;
  }
  const keys = Object.keys(node);
  const result = keys.map((key) => `${getSpacing(depth + 1)}  ${key}: ${getData(node[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getSpacing(depth)}  }`;
};

const getStylish = (diffObject) => {
  const iter = (node, depth) => {
    const lines = Object.entries(node).map(([key, {
      status, value, children, value1, value2,
    }]) => {
      switch (status) {
        case 'nested':
          return `${getSpacing(depth)}  ${key}: ${iter(children, depth + 1)}\n ${getSpacing(depth)} }`;
        case 'added':
          return `${getSpacing(depth)}+ ${key}: ${getData(value, depth)}`;
        case 'deleted':
          return `${getSpacing(depth)}- ${key}: ${getData(value, depth)}`;
        case 'changed':
          return [
            `${getSpacing(depth)}- ${key}: ${getData(value1, depth)}`,
            `${getSpacing(depth)}+ ${key}: ${getData(value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${getSpacing(depth)}  ${key}: ${getData(value, depth)}`;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });
    return `{\n${lines.join('\n')}`;
  };
  return `${iter(diffObject, 1)}\n}`;
};

export default getStylish;

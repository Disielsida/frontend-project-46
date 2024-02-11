import _ from 'lodash';

const getKeysUnion = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  return _.sortBy(_.union(keys1, keys2));
};

const getDiff = (object1, object2) => {
  const keysUnion = getKeysUnion(object1, object2);
  const result = keysUnion.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    let status;
    if (!_.has(object1, key)) {
      status = 'added';
    } else if (!_.has(object2, key)) {
      status = 'deleted';
    } else if (_.isEqual(value1, value2)) {
      status = 'unchanged';
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      status = 'nested';
    } else {
      status = 'changed';
    }

    const diffEntry = { status };
    if (status === 'nested') {
      diffEntry.children = getDiff(value1, value2);
    } else if (status === 'changed') {
      diffEntry.value1 = value1;
      diffEntry.value2 = value2;
    } else {
      diffEntry.value = (status === 'added') ? value2 : value1;
    }

    return { ...acc, [key]: diffEntry };
  }, {});

  return result;
};

export default getDiff;

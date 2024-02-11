import _ from 'lodash';

const getKeysUnion = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  return _.sortBy(_.union(keys1, keys2));
};

const getStatus = (value1, value2) => {
  if (_.isEqual(value1, value2)) {
    return 'unchanged';
  } if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return 'nested';
  } if (_.isUndefined(value1)) {
    return 'added';
  } if (_.isUndefined(value2)) {
    return 'deleted';
  }
  return 'changed';
};

const getDiff = (object1, object2) => {
  const keysUnion = getKeysUnion(object1, object2);
  const result = keysUnion.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    const status = getStatus(value1, value2);

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

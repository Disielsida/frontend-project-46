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

    let diffEntry = {};

    if (!_.has(object2, key)) {
      diffEntry = { ...diffEntry, value: value1, status: 'deleted' };
    } else if (!_.has(object1, key)) {
      diffEntry = { ...diffEntry, value: value2, status: 'added' };
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      diffEntry = { ...diffEntry, children: getDiff(value1, value2), status: 'nested' };
    } else if (_.isEqual(value1, value2)) {
      diffEntry = { ...diffEntry, value: value1, status: 'unchanged' };
    } else {
      diffEntry = {
        ...diffEntry, value1, value2, status: 'changed',
      };
    }

    return { ...acc, [key]: diffEntry };
  }, {});

  return result;
};

export default getDiff;

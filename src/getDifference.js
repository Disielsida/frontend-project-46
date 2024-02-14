import _ from 'lodash';

const combineAndSortKeys = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  return _.sortBy(_.union(keys1, keys2));
};

const getDiff = (object1, object2) => {
  const keysUnion = combineAndSortKeys(object1, object2);
  const result = keysUnion.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (!_.has(object2, key)) {
      return { ...acc, [key]: { value: object1[key], status: 'deleted' } };
    }

    if (!_.has(object1, key)) {
      return { ...acc, [key]: { value: object2[key], status: 'added' } };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { ...acc, [key]: { children: getDiff(object1[key], object2[key]), status: 'nested' } };
    }

    if (_.isEqual(value1, value2)) {
      return { ...acc, [key]: { value: object1[key], status: 'unchanged' } };
    }

    return { ...acc, [key]: { value1: object1[key], value2: object2[key], status: 'changed' } };
  }, {});

  return result;
};
export default getDiff;

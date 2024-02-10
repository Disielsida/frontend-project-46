import _ from 'lodash';

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const allKeys = _.sortBy(_.union(keys1, keys2));
  const result = allKeys.reduce((acc, key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!_.has(object2, key)) {
      return { ...acc, [key]: { value: value1, status: 'deleted' } };
    }
    if (!_.has(object1, key)) {
      return { ...acc, [key]: { value: value2, status: 'added' } };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { ...acc, [key]: { children: getDiff(value1, value2), status: 'nested' } };
    }
    if (_.isEqual(value1, value2)) {
      return { ...acc, [key]: { value: value1, status: 'unchanged' } };
    }
    return { ...acc, [key]: { value1, value2, status: 'changed' } };
  }, {});
  return result;
};

export default getDiff;

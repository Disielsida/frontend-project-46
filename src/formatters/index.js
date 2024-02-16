import getStylish from './getStylish.js';
import getPlain from './getPlain.js';

const getFormat = (diffObject, nameFormat) => {
  switch (nameFormat) {
    case 'stylish':
      return getStylish(diffObject);
    case 'plain':
      return getPlain(diffObject);
    case 'json':
      return JSON.stringify(diffObject, null, 2);
    default:
      throw new Error(`Invalid format - ${nameFormat}`);
  }
};

export default getFormat;

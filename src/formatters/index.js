import getStylish from './getStylish.js';

const getFormat = (diffObject, nameFormat) => {
  switch (nameFormat) {
    case 'stylish':
      return getStylish(diffObject);
    default:
      throw new Error(`Invalid format - ${nameFormat}`);
  }
};

export default getFormat;

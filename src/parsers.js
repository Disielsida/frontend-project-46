import yaml from 'js-yaml';

const parseData = (dataFile, extensionFile) => {
  switch (extensionFile) {
    case 'json':
      return JSON.parse(dataFile);
    case 'yaml':
      return yaml.load(dataFile);
    case 'yml':
      return yaml.load(dataFile);
    default:
      throw new Error(`Unknown extension! This extansion: ${extensionFile}, dataFile: ${dataFile}`);
  }
};

export default parseData;

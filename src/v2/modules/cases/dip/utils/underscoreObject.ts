import { underscore } from 'inflected';

const underscoreObject = (toUnderscore: Record<string, any>) => {
  if (typeof toUnderscore !== 'object' || toUnderscore === null) {
    return toUnderscore;
  }
  return Object.entries(toUnderscore).reduce((acc, [key, value]) => {
    const newKey = underscore(key);
    let newValue = value;

    if (value === null || value === undefined) {
    } else if (Array.isArray(value)) {
      newValue = value.map((element) => underscoreObject(element));
    } else if (typeof value === 'object') {
      newValue = underscoreObject(value);
    }
    return { ...acc, [newKey]: newValue };
  }, toUnderscore);
};

export default underscoreObject;

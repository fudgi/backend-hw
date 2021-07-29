const checkKeys = (obj, parameterKeys) => {
  const objKeys = Object.keys(obj);
  const neededKeys = objKeys.filter((key) => parameterKeys.includes(key));
  return neededKeys.length;
};

const gatherArgs = (obj) =>
  Object.values(obj).reduce((acc, item) => {
    acc.push(...item);
    return acc;
  }, []);

  const getValue = (obj, keys) => {
    const values = keys.map(key => obj[key]).filter(item => item)
    return values[0]
  }

module.exports = {
  checkKeys,
  gatherArgs,
  getValue
};

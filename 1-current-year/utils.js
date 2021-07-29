const checkKeys = (obj, parameterKeys) => {
  const objKeys = Object.keys(obj);
  const neededKeys = objKeys.filter((key) => parameterKeys.includes(key));
  return neededKeys[0];
};

const gatherArgs = (obj) =>
  Object.values(obj).reduce((acc, item) => {
    acc.push(...item);
    return acc;
  }, []);

module.exports = {
  checkKeys,
  gatherArgs
};

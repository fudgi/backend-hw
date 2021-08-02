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

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const calculateData = (func, argv, keys) => {
  const [yearKey, monthKey, dateKey] = keys;
  const date = new Date();

  if (yearKey) {
    const fYear = date.getFullYear();
    date.setFullYear(func(fYear, argv[yearKey]));
  }
  if (monthKey) {
    const fMonth = date.getMonth();
    date.setMonth(func(fMonth, argv[monthKey]));
  }
  if (dateKey) {
    const fDate = date.getDate();
    date.setDate(func(fDate, argv[dateKey]));
  }
  console.log(date);
};

const logDate = (keys) => {
  const [yearKey, monthKey, dateKey] = keys;
  const date = new Date();
  const answer = [];

  if (yearKey) answer.push(date.getUTCFullYear());
  if (monthKey) answer.push(date.getUTCMonth() + 1);
  if (dateKey) answer.push(date.getUTCDate());

  console.log(answer.join(" "));
};

module.exports = {
  checkKeys,
  gatherArgs,
  add,
  sub,
  calculateData,
  logDate,
};

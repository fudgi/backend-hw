#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { checkKeys, gatherArgs } = require("./utils.js");

const Arg = {
  year: ["year", "y"],
  month: ["month", "m"],
  date: ["date", "d"],
};
const ArgParams = gatherArgs(Arg);

const yargObj = yargs(hideBin(process.argv));
const argv = yargObj.argv;

const isNeededArgs = checkKeys(argv, ArgParams);

if (!isNeededArgs) {
  console.log(new Date());
  process.exit(1);
}

const isAddArgs = argv._.includes("add");
const isSubArgs = argv._.includes("sub");
const yearKey = checkKeys(argv, Arg.year);
const monthKey = checkKeys(argv, Arg.month);
const dateKey = checkKeys(argv, Arg.date);

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const calculateData = (func) => {
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

if (isAddArgs) calculateData(add);
else if (isSubArgs) calculateData(sub);
else {
  const date = new Date();
  const answer = [];

  if (yearKey) answer.push(date.getUTCFullYear());
  if (monthKey) answer.push(date.getUTCMonth() + 1);
  if (dateKey) answer.push(date.getUTCDate());

  console.log(answer.join(" "));
}

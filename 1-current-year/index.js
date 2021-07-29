#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { checkKeys, gatherArgs, getValue } = require("./utils.js");

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
  console.log("Нет подходящих аргументов");
  process.exit(1);
}

const isAddArgs = argv._.includes("add");
const isSubArgs = argv._.includes("sub");
const isYearArgs = checkKeys(argv, Arg.year);
const isMonthArgs = checkKeys(argv, Arg.month);
const isDateArgs = checkKeys(argv, Arg.date);

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const calculateData = (func) => {
  const date = new Date();
  if (isYearArgs) {
    const fYear = date.getFullYear();
    const value = getValue(argv, Arg.year);
    date.setFullYear(func(fYear, value));
  }
  if (isMonthArgs) {
    const fMonth = date.getMonth();
    const value = getValue(argv, Arg.month);
    date.setMonth(func(fMonth, value));
  }
  if (isDateArgs) {
    const fDate = date.getDate();
    const value = getValue(argv, Arg.date);
    date.setDate(func(fDate, value));
  }
  console.log(date);
};

if (isAddArgs) calculateData(add);
else if (isSubArgs) calculateData(sub);
else {
  const date = new Date();
  const answer = [];

  if (isYearArgs) answer.push(date.getUTCFullYear());
  if (isMonthArgs) answer.push(date.getUTCMonth() + 1);
  if (isDateArgs) answer.push(date.getUTCDate());

  console.log(answer.join(" "));
}

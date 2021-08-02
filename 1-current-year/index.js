#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const {
  checkKeys,
  gatherArgs,
  add,
  sub,
  calculateData,
  logDate,
} = require("./utils.js");

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

const keys = [yearKey, monthKey, dateKey];

if (isAddArgs) calculateData(add, argv, keys);
else if (isSubArgs) calculateData(sub, argv, keys);
else logDate(keys);

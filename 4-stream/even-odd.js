#!/usr/bin/env node
const fs = require("fs");
const readline = require("readline");
const { WIN, LOOSE } = require('./data')

const NC = "\033[0m";
const Green = "\033[0;32m";
const Yellow = "\033[0;33m";
const Purple = "\033[0;35m";
const Cyan = "\033[0;36m";

const winTextParams = ["Красава, отгадал. Сможешь повторить?", Green];
const looseTextParams = ["Не вышло,попробуй еще раз", Yellow];

let fileName = `./${process.argv[2] || "test"}.txt`;
let guessedValue;

const writeStream = fs.createWriteStream(fileName);
const input = readline.createInterface(process.stdin);

const log = (text, color = "") => console.log(color + text + NC);
const getNewNumber = () => String(Math.round(Math.random()));
const handleWrite = (text) => writeStream.write(text, "utf8");

const handleStart = () => {
  console.log("-----------------");
  log("я загадал число 0 или 1, угадай: ", Cyan);
  guessedValue = getNewNumber();
};

input.on("line", (text) => {
  if (text === "") return input.close();
  if (!Number.isInteger(Number(text))) return log("Ты что такое пишешь?", Purple);

  const isGuessed = guessedValue === text;
  const answer = isGuessed ? winTextParams : looseTextParams;
  log(...answer);
  handleWrite(isGuessed ? WIN : LOOSE);
  handleStart();
});

input.on("close", () => {
  writeStream.end();
  log(`Я все записал тут ${fileName}`, Purple);
});

log(`Результат будет записан в ${fileName}`,Purple);
log("Введи пустую строку для выхода", Purple);
handleStart();

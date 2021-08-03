#!/usr/bin/env node
const readline = require("readline");

const NC = "\033[0m";
const Green = "\033[0;32m";
const Yellow = "\033[0;33m";
const Purple = "\033[0;35m";
const Cyan = "\033[0;36m";

const range = [0, 1000];
let value;

const log = (text, color = "") => console.log(color + text + NC);
const init = () => {
  value = Math.round(Math.random() * range[1]);
  log(value);
  log(`Загадано число в диапазоне от ${range[0]} до ${range[1]}`, Purple);
};
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const handleNumber = async (entered, value) => {
  if (entered === value) {
    log("КРАСАВА!🥳🥳🥳 Отгадал", Green);
    await sleep(2000);
    log("Погнали еще раз?", Cyan);
    await sleep(2000);
    log("Впрочем, у тебя нет выбора", Cyan);
    await sleep(2000);
    init();
  } else if (entered < value) log("БОЛЬШЕ! 👆", Yellow);
  else if (entered > value) log("МЕНЬШЕ! 👇", Yellow);
};

const input = readline.createInterface(process.stdin);
init();

input.on("line", (data) => {
  if (data === "exit") input.close();

  const entered = Number(data);
  if (!entered) log("Ты что такое пишешь? 🧐", Cyan);
  handleNumber(entered, value);
});

input.on("close", () => log("Я так и думал, что ты сдашься 🤷", Cyan));

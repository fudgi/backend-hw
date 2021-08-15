#!/usr/bin/env node
const fs = require("fs");
const { WIN, LOOSE } = require("./data");

const obj = {};
let fileName = `${process.argv[2] || "test"}.txt`;

const readStream = fs.createReadStream(`./${fileName}`);
readStream.setEncoding("utf8");

readStream.on("data", (chunk) => {
  [...chunk].forEach((item) => {
    obj[item] = (obj[item] || 0) + 1;
  });
});

readStream.on("end", () => {
  const winned = obj[WIN];
  const loosed = obj[LOOSE];
  const total = winned + loosed;
  if(!total) return console.log("Ты еще не сыграл ни одной игры");

  console.log("Сыграно игр: ", winned + loosed);
  console.log("Выиграно: ", winned);
  console.log("Проиграно: ", loosed);
  console.log("Винрейт %", Math.round((winned * 100) / total, 2));
});

readStream.on("error", () => {
  console.log("ЧТо-то пошло не так. Ты точно написал нормальный путь?");
});

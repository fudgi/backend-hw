#!/usr/bin/env node
require("dotenv").config();
const http = require("http");
const readline = require("readline");

const API_KEY = process.env.API_KEY;
const apiPath = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=`;

let city = "Moscow";
let data = "";

const input = readline.createInterface(process.stdin);

const getCityData = (city) => {
  http
    .get(apiPath + city, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const parsedData = JSON.parse(data);
        if (parsedData.success === false) return console.log(`что-то не пошло не так c городом ${city}` );
        
        console.log(`Температура в ${city}: ${parsedData.current.temperature} градусов`);
      });
    })
    .on("error", () => console.log("error"));
};

input.on("line", (text) => {
  if (!text) console.log("Значит оставляем стандартный вариант");
  else city = text;

  getCityData(city);
  input.close();
});

console.log("Гадаю по погоде. Введи свой город(латиница)");
console.log("Если ты ничего не выберешь, то я скажу погоду для Москвы");

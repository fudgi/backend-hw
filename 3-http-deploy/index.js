#!/usr/bin/env node
const http = require("http");

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end('ok')
}).listen(3000)

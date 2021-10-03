#!/usr/bin/env node
const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'src/views'))
app.set("view engine", "pug")

app.get('/', (req, res) => {
    res.render('main')
})

app.get('/books', (req, res) => {
    res.render('books')
})

app.listen(3000)
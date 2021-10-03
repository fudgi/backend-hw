#!/usr/bin/env node
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'src/views'))
app.set("view engine", "pug")

app.get('/', (req, res) => {
    res.render('main')
})

app.get('/books', (req, res) => {
    res.render('books')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/view', (req, res) => {
    res.render('view')
})

app.listen(3000)
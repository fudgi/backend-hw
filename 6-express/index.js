#!/usr/bin/env node
const fs = require('fs')
const express = require('express')
const readFile = require('./readFile')

const filePath = './books.json'

const app = express()
app.listen(3000)
app.use(express.json())
//get all books
app.get('/api/books', async (_, res) => {
    const result = await readFile(filePath)
    res.send(result || [])
})

//get single book
app.get('/api/books/:id', async (req, res) => {
    const books = await readFile(filePath)
    const { id } = req.params
    const book = books.find((item) => item.id === Number(id))
    res.send(book || {})
})

app.post('/api/books', async (req, res) => {
    //create book
    const books = await readFile(filePath)
    books.push(req.body)
    fs.writeFile(filePath, JSON.stringify(books), (err) => {
        res.send('OK')
    })
})

app.put('/api/books/:id', async (req, res) => {
    //edit book

    res.send('asd')
})

app.delete('/api/books/:id', async (req, res) => {
    //delete book

    res.send('asd')
})

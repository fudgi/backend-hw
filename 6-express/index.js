#!/usr/bin/env node
const express = require('express')
const readFile = require('./read-file')
const writeFile = require('./write-file')

const filePath = './books.json'
const emptyBook = {
    author: '',
    imageLink: '',
    link: '',
    title: '',
}

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

//create book
app.post('/api/books', async (req, res) => {
    const books = await readFile(filePath)
    const currentId = books[books.length - 1].id
    books.push({ ...emptyBook, id: currentId + 1, ...req.body })
    await writeFile(filePath, books)
    res.send('OK')
})

//edit book
app.put('/api/books/:id', async (req, res) => {
    const books = await readFile(filePath)
    const { id } = req.params
    const index = books.findIndex((book) => book.id === Number(id))
    if (index === -1) return res.send('Not Included')
    books[index] = { ...books[index], ...req.body }
    await writeFile(filePath, books)
    res.send('OK')
})

//delete book
app.delete('/api/books/:id', async (req, res) => {
    const books = await readFile(filePath)
    const { id } = req.params
    const newBooks = books.filter((book) => book.id !== Number(id))
    await writeFile(filePath, newBooks)
    res.send('OK')
})

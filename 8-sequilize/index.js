#!/usr/bin/env node
const express = require('express')
const app = express()
const path = require('path')
const upload = require('./multer')
const Book = require('./book')
const { Book: BookSq } = require('./database/model-relations')

const filePath = './books.json'
const book = new Book(filePath)

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.get('/', async (_, res) => {
    res.render('main')
})

app.get('/books', async (_, res) => {
    const books = await book.getBooks()
    res.render('books', { books })
})

app.get('/create', async (_, res) => {
    res.render('create')
})

app.get('/view/:id', async (req, res) => {
    const { id } = req.params
    const bookData = await book.getSingleBook(id)
    res.render('view', bookData)
})

app.get('/update/:id', async (req, res) => {
    const { id } = req.params
    const bookData = await book.getSingleBook(id)
    res.render('update', bookData)
})

//get book
app.get('/api/books', async (req, res) => {
    const books = await BookSq.findAll()
    res.send(books)
})

//create book
app.post('/api/books', upload.single('file'), async (req, res) => {
    const fields = req.body
    const id = await book.createBook({ ...fields, file: req?.file?.filename })
    res.send({ id })
})

//edit book
app.put('/api/books/:id', upload.single('file'), async (req, res) => {
    const fields = req.body
    const { id } = req.params
    try {
        await book.editBook(id, { ...fields, file: req?.file?.filename })
    } catch {
        res.status(400).send('BAD')
        return
    }
    res.status(200).send('OK')
})

app.listen(3000)

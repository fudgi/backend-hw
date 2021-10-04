const fs = require('fs')

const emptyBook = {
    author: '',
    imageLink: '',
    link: '',
    title: '',
}

class Book {
    constructor(path) {
        this.filePath = path
    }

    getBooks = () => {
        return new Promise((resolve) => {
            fs.readFile(this.filePath, (_, data) => {
                const parsedData = JSON.parse(data)
                return resolve(parsedData)
            })
        })
    }

    addBooks = (data) => {
        return new Promise((resolve) => {
            fs.writeFile(this.filePath, JSON.stringify(data), () =>
                resolve(true)
            )
        })
    }

    getSingleBook = async (id) => {
        const books = await this.getBooks()
        const book = books.find((item) => item.id === Number(id))
        return book
    }

    createBook = async (fields) => {
        const books = await this.getBooks()
        const currentId = books[books.length - 1].id
        books.push({ ...emptyBook, id: currentId + 1, ...fields })
        await this.addBooks(books)
    }

    editBook = async (id, fields) => {
        const books = await this.getBooks()
        const index = books.findIndex((book) => book.id === Number(id))
        if (index === -1) return new Error('!!')
        books[index] = { ...books[index], ...fields }
        await this.addBooks(books)
    }

    deleteBooks = async (id) => {
        const books = await this.getBooks()
        const newBooks = books.filter((book) => book.id !== Number(id))
        await this.addBooks(newBooks)
    }
}

module.exports = Book

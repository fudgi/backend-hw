const fs = require('fs')
const sequelize = require('./sequelize')
const Author = require('./Author.model')
const Book = require('./Book.model')
const booksPath = 'books.json'
const authorsPath = 'authors.json'

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'))
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'))

Author.belongsToMany(Book, { through: 'AuthorBook', foreignKey: 'author_id' })

sequelize.sync().then(async () => {
    for await (const author of authors) {
        await Author.findOrCreate({
            where: {
                authorName: author.author,
            },
        })
    }
    for await (const book of books) {
        const author = await Author.findOne({
            where: { authorName: book.author },
        })
        await Book.findOrCreate({
            where: {
                imageLink: book.imageLink,
                link: book.link,
                title: book.title,
                author_id: author.id,
            },
        })
    }
})

module.exports = {
    Book,
    Author,
}

const { DataTypes } = require('sequelize')
const Author = require('./Author.model')
const sequelize = require('./sequelize')

const Book = sequelize.define(
    'Book',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        imageLink: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        link: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,

            references: {
                model: Author,
                key: 'id',
            },
        },
    },
    {
        // Other model options go here - сюда можно прокидывать хуки и дополнительные опции
    }
)

module.exports = Book

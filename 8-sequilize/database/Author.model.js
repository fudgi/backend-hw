const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

const Author = sequelize.define(
    'Author',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here - сюда можно прокидывать хуки и дополнительные опции
    }
)

module.exports = Author

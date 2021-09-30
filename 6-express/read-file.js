const fs = require('fs')

const readFile = (filePath) => {
    return new Promise((resolve) => {
        fs.readFile(filePath, (_, data) => {
            const parsedData = JSON.parse(data)
            return resolve(parsedData)
        })
    })
}
module.exports = readFile
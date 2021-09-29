const fs = require('fs')

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if(err) reject('я сломался')
            const parsedData = JSON.parse(data)
            return resolve(parsedData)
        })
    })
}
module.exports = readFile
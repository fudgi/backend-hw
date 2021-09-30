const fs = require('fs')

const writeFile = (filePath, data) => {
    return new Promise((resolve) => {
        fs.writeFile(filePath, JSON.stringify(data), () => resolve(true))
    })
}

module.exports = writeFile

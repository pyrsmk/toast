const uglify = require('uglify-js')
const fs = require('fs')

module.exports = async options => {
    const params = {}
    if ('sourcemap' in options && 'filename' in options) {
        params.sourceMap = {
            filename: options.filename,
            url: 'inline',
        }
    }
    await new Promise((resolve, reject) => {
        fs.readFile(options.from, 'utf8', (readError, data) => {
            if (readError) reject(readError)
            fs.writeFile(options.to, uglify.minify(data, params).code, writeError => {
                if (writeError) reject(writeError)
                resolve()
            })
        })
    })
}

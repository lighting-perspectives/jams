const multer = require('multer') // middleware for handling multipart/form-data

const audioFilter = require('./audioFilter')
const destination = require('./destination')
const filename = require('./filename')

/**
 * Set destination and filename of the uploaded file.
 *
 * @type {*|DiskStorage}
 */
const storage = multer.diskStorage({destination, filename})

module.exports = multer({storage: storage, fileFilter: audioFilter}).single('audioFile')

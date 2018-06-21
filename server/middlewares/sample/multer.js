const multer = require('multer') // middleware for handling multipart/form-data

const audioFilter = require('./audioFilter')
const destination = require('./destination')
const filename = require('./filename')

/**
 * Sets destination and filename of the uploaded file, filters audio file.
 *
 * @see middlewares/sample/multer
 *
 * @type {*|DiskStorage}
 */
const storage = multer.diskStorage({destination, filename})

module.exports = multer({storage: storage, fileFilter: audioFilter}).single('audioFile')

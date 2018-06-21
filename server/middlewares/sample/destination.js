const path = require('path')

/**
 * Set the uploaded file destination.
 *
 * @see middlewares/sample/multer
 *
 * @param req
 * @param file
 * @param cb
 */
const destination = (req, file, cb) => {
  let dir

  if (process.env.NODE_ENV === 'test') {
    dir = path.join(__dirname, '../../test/data/audio')
  } else {
    dir = path.join(__dirname, '../../static/audio')
  }

  cb(null, dir)
}

module.exports = destination

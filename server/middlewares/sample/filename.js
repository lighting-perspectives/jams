/**
 * Sets the file name.
 *
 * @see middlewares/sample/multer
 *
 * @param req
 * @param file
 * @param cb
 */
const filename = (req, file, cb) => {
  const uuid = req.params.id ? req.params.id : req.uuid
  if (!uuid) {
    return cb(new Error('Failed to get a UUID. It should be set in generateUUID middleware or get from request paramaters.'))
  }

  cb(null, uuid)
}

module.exports = filename

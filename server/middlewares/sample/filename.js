const filename = (req, file, cb) => {
  cb(null, req.uuid)
}

module.exports = filename

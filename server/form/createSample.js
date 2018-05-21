const path = require('path')
const multer = require('multer') // middleware for handling multipart/form-data
const sanitize = require('sanitize-filename')
const {mp4Filter} = require('../utils')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = process.env.NODE_ENV === 'test'
      ? path.join(__dirname, '../test/data/files')
      : path.join(__dirname, '../static/audio')

    cb(null, dir)
  },
  filename: (req, file, cb) => {
    console.log('sanitized filename', sanitize(file.originalname))
    cb(null, sanitize(file.originalname).replace(/\s/g, '_'))
  }
})

module.exports = multer({storage: storage, fileFilter: mp4Filter}).single('audioFile')

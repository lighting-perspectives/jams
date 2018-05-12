const pdfFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error('Only PDF files are allowed!'), false)
  }
  cb(null, true)
}

const mp4Filter = function (req, file, cb) {
  if (!file.originalname.match(/\.(mp4|MP4|wav|WAV)$/)) {
    return cb(new Error('Only audio files are allowed!'), false)
  }
  cb(null, true)
}

module.exports = {
  pdfFilter,
  mp4Filter
}

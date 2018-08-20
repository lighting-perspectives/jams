const audio = require('../../audio')
const NotAudioFileError = require('../../errors/NotAudioFileError')

/**
 * Filters audio file and checks file extension.
 *
 * @see middlewares/sample/multer
 *
 * @param req
 * @param file The uploaded file
 * @param cb   Multer callback function
 * @returns {*}
 */
const audioFilter = function (req, file, cb) {
  const fileExtension = file.originalname.split('.')[1].toLowerCase()

  if (!audio.supportedExtensions.includes(fileExtension)) {
    return cb(new NotAudioFileError({extension: fileExtension}), false)
  }

  cb(null, true)
}

module.exports = audioFilter

const path = require('path')

const WAVEMetadata = require('./infos/WAVEMetadata')
const FLACMetadata = require('./infos/FLACMetadata')
const MP3Metadata = require('./infos/MP3Metadata')

const infos = (filename) => {
  // guess from extension
  const extension = path.extname(filename).toLowerCase()
  let metadata = null

  switch (extension) {
    case '.mp3':
      return new Promise((resolve, reject) => {
        metadata = new MP3Metadata(filename)
        return metadata.infos()
          .then(infos => resolve(infos))
          .catch(error => reject(error))
      })

    case '.wav':
      return new Promise((resolve, reject) => {
        metadata = new WAVEMetadata(filename)
        return metadata.infos()
          .then(infos => resolve(infos))
          .catch(error => reject(error))
      })

    case '.flac':
      return new Promise((resolve, reject) => {
        metadata = new FLACMetadata(filename)
        return metadata.infos()
          .then(infos => resolve(infos))
          .catch(error => reject(error))
      })

    case '':
      return new Promise((resolve, reject) => {
        metadata = new MP3Metadata(filename)
        return metadata.infos()
          .then(infos => {
            if (infos == null) {
              metadata = new WAVEMetadata(filename)
              return metadata.infos()
                .then(infos => {
                  if (infos === null) {
                    metadata = new FLACMetadata(filename)
                    return metadata.infos()
                      .then(infos => {
                        if (infos === null) {
                          return resolve(null)
                        }

                        return resolve(infos)
                      })
                      .catch(error => reject(error))
                  }

                  return resolve(infos)
                })
                .catch(error => reject(error))
            }

            return resolve(infos)
          })
          .catch(error => reject(error))
      })

    default:
      return new Promise((resolve) => {
        return resolve(null)
      })
  }
}

module.exports = infos

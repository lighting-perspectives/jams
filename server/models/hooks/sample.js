const fs = require('fs')

module.exports = {
  afterDestroy (sample, options) {
    const audioFileToRemove = sample.dataValues.path

    fs.unlink(audioFileToRemove, err => {
      if (err) throw err
    })
  }
}

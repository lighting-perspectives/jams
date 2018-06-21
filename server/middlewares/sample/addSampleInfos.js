const audio = require('../../audio')

/**
 * Adds audio infos to a sample object.
 *
 * res.extra.sample or res.extra.samples is required and is normally set in sampleCreate, sampleUpdate,
 * sampleFindById, sampleFindAll middlewares.
 *
 * @see middlewares/sample/create
 * @see middlewares/sample/update
 * @see middlewares/sample/findById
 * @see middlewares/sample/findAll
 *
 * @param req
 * @param res
 * @param next
 */
const addInfos = (req, res, next) => {
  if (res.extra && res.extra.sample) {
    const sample = res.extra.sample // from sample CRUD middleware

    return audio.infos(sample.path)
      .then(infos => {
        res.extra = {
          ...res.extra,
          sample: {
            ...sample,
            infos: infos
          }
        }
        next()
      })
      .catch(next)
  } else if (res.extra && res.extra.samples) {
    const samples = res.extra.samples

    return Promise
      .all(samples.map(sample => audio.infos(sample.path)))
      .then(infos => {
        res.extra.samples = samples.map((sample, index) => {
          return {
            ...sample,
            infos: infos[index]
          }
        })

        next()
      })
      .catch(next)
  } else {
    return new Promise((resolve, reject) => {
      resolve(next(new Error('The \'sample\' property in request extra parameter is missing. It should be set in sample middleware')))
    })
  }
}

module.exports = addInfos

const DatabaseError = require('../../../errors/DatabaseError')

const DEFAULT = {
  CONTAINER: 'WAV',
  GROUP: 'default'
}

const create = (Sample) => {
  /**
   * Creates a sample Model instance and persists it.
   *
   * req.uuid is required and is normally set in generateUUID middleware.
   * req.file is required and is normally set in multer middleware.
   *
   * @see middlewares/generateUUID
   * @see middlewares/multer
   *
   * @param req
   * @param res
   * @param next
   * @returns {*|Promise<T>|TypeError}
   */
  const middleware = (req, res, next) => {
    if (!req.uuid) {
      return Promise.resolve(next(new Error('The \'uuid\' property of request is missing, it should set in generateUUID middleware')))
    }

    if (!req.file) {
      return Promise.resolve(next(new Error('The \'file\' property of request is missing, it should set in multer middleware')))
    }

    return Sample
      .create({
        id: req.uuid,
        path: req.file.path, // from multer middleware
        filename: req.file.originalname, // from multer middleware
        container: req.body.container || DEFAULT.CONTAINER,
        label: req.body.label || req.file.originalname,
        group: req.body.group || DEFAULT.GROUP
      })
      .then(sample => {
        res.status(201)
        res.extra = {
          ...res.extra,
          sample: sample.get()
        }
        return next()
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = create

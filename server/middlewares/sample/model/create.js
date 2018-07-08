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
      const msg = "The request object should contain a 'uuid' property, it should have been set in the 'generateUUID' middleware"
      return Promise.resolve(next(new Error(msg)))
    }

    if (!req.file) {
      const msg = "The request object should contain a 'file' property, it should have been set in the 'multer' middleware"
      return Promise.resolve(next(new Error(msg)))
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

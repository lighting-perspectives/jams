const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Set Instrument model for the further query.
 *
 * @param Instrument
 * @returns {function(*, *=, *=): Promise<T>}
 */
const create = (Instrument) => {
  /**
   * Creates a instrument Model instance and persists it.
   *
   * req.uuid is required and is normally set in generateUUID middleware.
   *
   * @see middlewares/generateUUID
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

    return Instrument
      .create({
        id: req.uuid,
        label: req.body.label
      })
      .then(instrument => {
        res.status(201)
        res.extra = {
          ...res.extra,
          instrument: instrument.get()
        }
        return next()
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = create

const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Set the IsntrumentMapping for the further query.
 *
 * @param InstrumentMapping
 * @returns {function(*, *, *): Promise<T>}
 */
const findById = (InstrumentMapping) => {
  /**
   * Finds a instrument mapping Model instance by its id and returns it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return InstrumentMapping
      .findById(req.params.id, {})
      .then((mapping) => {
        if (!mapping) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        res.status(200)
        res.extra = {
          ...res.extra,
          mapping: mapping.get()
        }
        return next()
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = findById

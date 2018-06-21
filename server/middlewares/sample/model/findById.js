const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Sample Model for the further query.
 *
 * @param Sample
 * @returns {function(*, *, *): Promise<T>}
 */
const findById = (Sample) => {
  /**
   * Finds a sample Model instance by its id and returns it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return Sample
      .findById(req.params.id, {})
      .then(sample => {
        if (!sample) {
          return next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        res.status(200)
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

module.exports = findById

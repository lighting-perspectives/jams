const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Sample Model for the further query.
 *
 * @param Sample
 * @returns {function(*, *=, *=): Promise<T>}
 */
const destroy = (Sample) => {
  /**
   * Removes a sample Model instance from the database.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return Sample
      .findById(req.params.id)
      .then(sample => {
        if (!sample) {
          return next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        return sample
          .destroy()
          .then(() => {
            res.status(204)
            res.extra = {
              ...res.extra,
              sample: null
            }
            return next()
          })
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = destroy

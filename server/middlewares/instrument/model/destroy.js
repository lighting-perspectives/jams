const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Instrument Model for the further query.
 *
 * @param Instrument
 * @returns {function(*, *=, *=): Promise<T>}
 */
const destroy = Instrument => {
  /**
   * Removes an instrument Model instance from the database.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return Instrument
      .findById(req.params.id, {})
      .then(instrument => {
        if (!instrument) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        return instrument
          .destroy()
          .then(() => {
            res.status(204)
            res.extra = {
              ...res.extra,
              instrument: null
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

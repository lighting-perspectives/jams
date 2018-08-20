const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the InstrumentMapping Model for the further query.
 *
 * @param InstrumentMapping
 * @returns {function(*, *=, *=): Promise<T>}
 */
const destroy = InstrumentMapping => {
  /**
   * Removes an instrument mapping Model instance from the database.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return InstrumentMapping
      .findById(req.params.id)
      .then(mapping => {
        if (!mapping) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }
        return mapping
          .destroy()
          .then(() => {
            res.status(204)
            res.extra = {
              ...res.extra,
              mapping: null
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

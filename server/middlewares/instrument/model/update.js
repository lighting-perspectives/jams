const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Instrument Model for the further query.
 *
 * @param Instrument
 * @returns {function(*, *=, *=): Promise<T>}
 */
const update = (Instrument) => {
  /**
   * Updates a sample Model instance and persists it.
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
          .update({
            label: req.body.label || instrument.label
          })
          .then(instrument => {
            res.status(200)
            res.extra = {
              ...res.extra,
              instrument: instrument.get()
            }
            return next()
          })
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = update

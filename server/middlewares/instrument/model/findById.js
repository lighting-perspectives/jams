const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Instrument and InstrumentMapping Models for the further query.
 *
 * @param Instrument
 * @param InstrumentMapping
 * @returns {function(*, *, *): Promise<T>}
 */
const findById = (Instrument, InstrumentMapping) => {
  /**
   * Finds a instrument Model instance by its id and returns it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return Instrument
      .findById(req.params.id, {
        include: [{
          model: InstrumentMapping,
          as: 'mappings'
        }]
      })
      .then(instrument => {
        if (!instrument) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        res.status(200)
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

module.exports = findById

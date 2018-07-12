const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Set Instrument and InstrumentMapping models for the further query.
 *
 * @param Instrument
 * @param InstrumentMapping
 * @returns {function(*, *=, *=): Promise<T>}
 */
const findAllMapping = (Instrument, InstrumentMapping) => {
  /**
   * Finds all mapping Model instances of a given instrument and returns them.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    let queryOptions = {
      where: {instrumentId: req.params.instrumentId},
      order: [['updatedAt', 'DESC']]
    }

    return Instrument
      .findById(req.params.instrumentId, {})
      .then(instrument => {
        if (!instrument) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        return InstrumentMapping
          .all(queryOptions)
          .then(instruments => {
            res.status(200)
            res.extra = {
              ...res.extra,
              instruments: instruments.map(s => s.get())
            }
            return next()
          })
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = findAllMapping

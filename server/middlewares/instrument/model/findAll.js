const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Instrument and InstrumentMapping Model for the further query.
 *
 * @returns {middleware}
 * @param Instrument
 * @param InstrumentMapping
 */
const findAll = (Instrument, InstrumentMapping) => {
  /**
   * Finds all instrument Model instances and returns them.
   *
   * @param req
   * @param res
   * @param next
   * @returns {*|Promise<T>}
   */
  const middleware = (req, res, next) => {
    let queryOptions = {
      include: [{
        model: InstrumentMapping,
        as: 'mappings'
      }],
      order: [['updatedAt', 'DESC']]
    }

    return Instrument
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
  }

  return middleware
}

module.exports = findAll

const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Set Instrument and InstrumentMapping models for the further query.
 *
 * @param Instrument
 * @param InstrumentMapping
 * @returns {function(*, *=, *=): Promise<T>}
 */
const create = (Instrument, InstrumentMapping) => {
  /**
   * Creates a instrument mapping Model instance and persists it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    if (!req.uuid) {
      const msg = "The request object should contain a 'uuid' property, it should have been set in the 'generateUUID' middleware"
      return Promise.resolve(next(new Error(msg)))
    }

    return Instrument
      .findById(req.params.instrumentId, {})
      .then(instrument => {
        if (!instrument) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        return InstrumentMapping
          .create({
            id: req.uuid,
            lowerRank: req.body.lowerRank,
            upperRank: req.body.upperRank,
            referenceRank: req.body.referenceRank,
            sampleId: req.body.sampleId,
            instrumentId: req.params.instrumentId
          })
          .then(mapping => {
            res.status(201)
            res.extra = {
              ...res.extra,
              mapping: mapping.get()
            }
            return next()
          })
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = create

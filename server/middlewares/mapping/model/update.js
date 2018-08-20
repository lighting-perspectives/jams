const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Set the InstrumentMapping Model for the further query.
 *
 * @param InstrumentMapping
 * @returns {function(*, *=, *=): Promise<T>}
 */
const update = InstrumentMapping => {
  /**
   * Updates an instrument mapping Model instance and persists it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return InstrumentMapping
      .findById(req.params.id, {})
      .then(mapping => {
        if (!mapping) {
          return next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        return mapping
          .update({
            lowerRank: parseInt(req.body.lowerRank) || mapping.lowerRank,
            upperRank: parseInt(req.body.upperRank) || mapping.upperRank,
            referenceRank: parseInt(req.body.referenceRank) || mapping.referenceRank,
            sampleId: req.body.sampleId || mapping.sampleId,
            instrumentId: req.body.instrumentId || mapping.instrumentId
          })
          .then(mapping => {
            res.status(200)
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

module.exports = update

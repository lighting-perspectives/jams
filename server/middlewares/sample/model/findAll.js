const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Sample Model for the further query.
 *
 * @param Sample
 * @returns {middleware}
 */
const findAll = (Sample) => {
  /**
   * Finds all sample Model instances and returns them.
   *
   * @param req
   * @param res
   * @param next
   * @returns {*|Promise<T>}
   */
  const middleware = (req, res, next) => {
    let queryOptions = {
      order: [['updatedAt', 'DESC']]
    }

    if (req.query.group) {
      queryOptions = {
        ...queryOptions,
        where: { group: req.query.group }
      }
    }

    return Sample
      .all(queryOptions)
      .then(samples => {
        res.status(200)
        res.extra = {
          ...res.extra,
          samples: samples.map(s => s.get())
        }
        return next()
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }

  return middleware
}

module.exports = findAll

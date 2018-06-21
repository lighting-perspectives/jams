const DatabaseError = require('../../../errors/DatabaseError')

/**
 * Sets the Sample Model for the further query.
 *
 * @param Sample
 * @returns {function(*, *=, *=): Promise<T>}
 */
const update = (Sample) => {
  /**
   * Updates a sample Model instance and persists it.
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<T>}
   */
  const middleware = (req, res, next) => {
    return Sample
      .findById(req.params.id, {})
      .then(sample => {
        if (!sample) {
          return next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        return sample
          .update({
            path: (req.file ? req.file.path : null) || sample.path,
            filename: (req.file ? req.file.filename : null) || sample.filename,
            label: req.body.label || sample.label,
            group: req.body.group || sample.group
          })
          .then(() => {
            res.status(200)
            res.extra = {
              ...res.extra,
              sample: sample.get()
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

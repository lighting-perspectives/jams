/**
 * Sends the response.
 *
 * res.extra.mapping or res.extra.mappings is required and is normally set in instrumentMappingCreate, instrumentMappingUpdate,
 * instrumentMappingFindById, instrumentMappingFindAll middlewares.
 *
 * @param req
 * @param res
 * @param next
 */
const send = (req, res, next) => {
  if (res.statusCode === 204) { // No content
    res.end()
  } else if (res.extra && res.extra.mapping) {
    res.send(res.extra.mapping)
  } else if (res.extra && res.extra.mappings) {
    res.send(res.extra.mappings)
  } else {
    next(new Error('The \'mapping(s)\' property in response extra object is missing.'))
  }
}

module.exports = send

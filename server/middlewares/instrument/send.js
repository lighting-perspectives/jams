/**
 * Sends the response.
 *
 * res.extra.instrument or res.extra.instruments is required and is normally set in instrumentCreate, instrumentUpdate,
 * instrumentFindById, instrumentFindAll middlewares.
 *
 * @param req
 * @param res
 * @param next
 */
const send = (req, res, next) => {
  if (res.statusCode === 204) { // No content
    res.end()
  } else if (res.extra && res.extra.instrument) {
    res.send(res.extra.instrument)
  } else if (res.extra && res.extra.instruments) {
    res.send(res.extra.instruments)
  } else {
    next(new Error('The \'instrument(s)\' property in response extra object is missing.'))
  }
}

module.exports = send

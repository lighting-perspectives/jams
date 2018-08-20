/**
 * Sends the response.
 *
 * res.extra.sample or res.extra.samples is required and is normally set in sampleCreate, sampleUpdate,
 * sampleFindById, sampleFindAll middlewares.
 *
 * @param req
 * @param res
 * @param next
 */
const send = (req, res, next) => {
  if (res.statusCode === 204) { // No content
    res.end()
  } else if (res.extra && res.extra.sample) {
    res.send(res.extra.sample)
  } else if (res.extra && res.extra.samples) {
    res.send(res.extra.samples)
  } else {
    next(new Error('The \'sample(s)\' property in response extra object is missing.'))
  }
}

module.exports = send

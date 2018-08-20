const uuidv4 = require('uuid/v4')

/**
 * Express middleware : generate a fresh UUID to used when creating entity.
 *
 * @param req
 * @param res
 * @param next
 */
const generateUUID = function (req, res, next) {
  req.uuid = uuidv4()

  next()
}

module.exports = generateUUID

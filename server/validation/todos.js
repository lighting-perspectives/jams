module.exports = {
  checkId (req, res, next, id) { // in router.param()
    req.checkParams('id', 'Id must be an integer').isInt()

    const errors = req.validationErrors()
    if (errors) {
      console.log('validation errors', errors.map((error) => `${error.param} : ${error.msg}`))

      return res.status(422).send(errors)
    }

    next()
  },

  createCheck (req, res, next) {
    req.checkBody('title', 'Title cannot be empty').notEmpty()

    const errors = req.validationErrors()
    if (errors) {
      console.log('validation errors', errors.map((error) => `${error.param} : ${error.msg}`))

      return res.status(422).send(errors)
    }

    next()
  },

  updateCheck (req, res, next) {
    req.checkBody('title', 'Title should not be empty').notEmpty()

    const errors = req.validationErrors()
    if (errors) {
      console.log('validation errors', errors.map((error) => `${error.param} : ${error.msg}`))

      return res.status(422).send(errors)
    }

    next()
  }
}

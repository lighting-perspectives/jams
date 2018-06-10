const Sample = require('../models').Sample
const DatabaseError = require('../errors/DatabaseError')

const DEFAULT = {
  CONTAINER: 'WAV',
  GROUP: 'default'
}

module.exports = {
  create (req, res, next) {
    return Sample
      .create({
        id: req.uuid, // from generateID custom middleware
        path: req.file.path, // from multer middleware
        filename: req.file.originalname, // from multer middleware
        container: req.body.container || DEFAULT.CONTAINER,
        label: req.body.label || req.file.originalname,
        group: req.body.group || DEFAULT.GROUP
      })
      .then(sample => res.status(201).send(sample))
      .catch(error => next(new DatabaseError(error, 400)))
  },

  update (req, res, next) {
    return Sample
      .findById(req.params.id, {})
      .then(sample => {
        if (!sample) {
          next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        return sample
          .update({
            path: (req.file ? req.file.path : null) || sample.path,
            filename: (req.file ? req.file.filename : null) || sample.filename,
            label: req.body.label || sample.label,
            group: req.body.group || sample.group
          })
          .then(() => res.status(200).send(sample))
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  destroy (req, res, next) {
    return Sample
      .findById(req.params.id)
      .then(sample => {
        if (!sample) {
          next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        return sample
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findById (req, res, next) {
    return Sample
      .findById(req.params.id, {})
      .then(sample => {
        if (!sample) {
          next(new DatabaseError(null, 404, `Failed to retrieve sample n°${req.params.id}`))
        }

        return res.status(200).send(sample)
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findAll (req, res, next) {
    if (req.query.group) {
      return Sample
        .all({
          where: {group: req.query.group},
          order: [['updatedAt', 'DESC']]
        })
        .then(samples => res.status(200).send(samples))
        .catch(error => next(new DatabaseError(error, 400)))
    }

    return Sample
      .all({
        order: [['updatedAt', 'DESC']]
      })
      .then(samples => res.status(200).send(samples))
      .catch(error => next(new DatabaseError(error, 400)))
  }

}

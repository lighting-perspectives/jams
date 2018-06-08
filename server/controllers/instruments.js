const Instrument = require('../models').Instrument
const InstrumentMapping = require('../models').InstrumentMapping
const uuidv4 = require('uuid/v4')
const DatabaseError = require('../errors/DatabaseError')

module.exports = {
  create (req, res, next) {
    return Instrument
      .create({
        id: uuidv4(),
        label: req.body.label
      })
      .then(instrument => res.status(201).send(instrument))
      .catch(error => next(new DatabaseError(error, 400)))
  },

  update (req, res, next) {
    return Instrument
      .findById(req.params.id, {})
      .then(instrument => {
        if (!instrument) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        return instrument
          .update({
            label: req.body.label || instrument.label
          })
          .then(instrument => res.status(200).send(instrument))
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  destroy (req, res, next) {
    return Instrument
      .findById(req.params.id)
      .then(instrument => {
        if (!instrument) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }
        return instrument
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findById (req, res, next) {
    return Instrument
      .findById(req.params.id, {
        include: [{
          model: InstrumentMapping,
          as: 'mappings'
        }]
      })
      .then(instrument => {
        if (!instrument) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        return res.status(200).send(instrument)
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findAll (req, res, next) {
    return Instrument
      .all({
        include: [{
          model: InstrumentMapping,
          as: 'mappings'
        }],
        order: [['updatedAt', 'DESC']]
      })
      .then(instruments => res.status(200).send(instruments))
      .catch(error => next(new DatabaseError(error, 400)))
  }
}

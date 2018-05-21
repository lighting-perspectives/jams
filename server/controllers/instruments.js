const Instrument = require('../models').Instrument

const uuidv4 = require('uuid/v4')

module.exports = {
  create (req, res) {
    return Instrument
      .create({
        id: uuidv4(),
        label: req.body.label
      })
      .then(instrument => res.status(201).send(instrument))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return Instrument
      .findById(req.params.id, {})
      .then(instrument => {
        if (!instrument) {
          return res.status(404).send({
            message: `Failed to retrieve instrument n°${req.params.id}`
          })
        }

        return instrument
          .update({
            label: req.body.label || instrument.label
          })
          .then(instrument => res.status(200).send(instrument))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return Instrument
      .findById(req.params.id)
      .then(instrument => {
        if (!instrument) {
          return res.status(404).send({
            message: `Failed to retrieve instrument n°${req.params.id}`
          })
        }
        return instrument
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  findById (req, res) {
    return Instrument
      .findById(req.params.id, {})
      .then(instrument => {
        if (!instrument) {
          return res.status(404).send({
            message: `Failed to retrieve instrument n°${req.params.id}`
          })
        }

        return res.status(200).send(instrument)
      })
      .catch(error => res.status(400).send(error))
  },

  findAll (req, res) {
    return Instrument
      .all({
        order: [['updatedAt', 'DESC']]
      })
      .then(instruments => res.status(200).send(instruments))
      .catch(error => res.status(400).send(error))
  }
}

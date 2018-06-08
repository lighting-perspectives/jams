const InstrumentMapping = require('../models').InstrumentMapping
const Instrument = require('../models').Instrument
const uuidv4 = require('uuid/v4')
const DatabaseError = require('../errors/DatabaseError')

module.exports = {
  create (req, res, next) {
    return Instrument
      .findById(req.params.instrumentId, {})
      .then(instrument => {
        if (!instrument) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument n°${req.params.id}`))
        }

        return InstrumentMapping
          .create({
            id: uuidv4(),
            lowerRank: req.body.lowerRank,
            upperRank: req.body.upperRank,
            referenceRank: req.body.referenceRank,
            sampleId: req.body.sampleId,
            instrumentId: req.params.instrumentId
          })
          .then(instrument => res.status(201).send(instrument))
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  update (req, res, next) {
    return InstrumentMapping
      .findById(req.params.id, {})
      .then(mapping => {
        if (!mapping) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        return mapping
          .update({
            lowerRank: parseInt(req.body.lowerRank) || mapping.lowerRank,
            upperRank: parseInt(req.body.upperRank) || mapping.upperRank,
            referenceRank: parseInt(req.body.referenceRank) || mapping.referenceRank,
            sampleId: req.body.sampleId || mapping.sampleId,
            instrumentId: req.body.instrumentId || mapping.instrumentId
          })
          .then(mapping => res.status(200).send(mapping))
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  destroy (req, res, next) {
    return InstrumentMapping
      .findById(req.params.id)
      .then(mapping => {
        if (!mapping) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }
        return mapping
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findById (req, res, next) {
    return InstrumentMapping
      .findById(req.params.id, {})
      .then((mapping) => {
        if (!mapping) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        return res.status(200).send(mapping)
      })
      .catch(error => next(new DatabaseError(error, 400)))
  },

  findAll (req, res, next) {
    return Instrument
      .findById(req.params.instrumentId, {})
      .then(instrument => {
        if (!instrument) {
          next(new DatabaseError(null, 404, `Failed to retrieve instrument mapping n°${req.params.id}`))
        }

        return InstrumentMapping
          .all({
            where: {instrumentId: instrument.id},
            order: [['updatedAt', 'DESC']]
          })
          .then(mappings => res.status(200).send(mappings))
          .catch(error => next(new DatabaseError(error, 400)))
      })
      .catch(error => next(new DatabaseError(error, 400)))
  }
}

const InstrumentMapping = require('../models').InstrumentMapping

const uuidv4 = require('uuid/v4')

module.exports = {
  create (req, res) {
    return InstrumentMapping
      .create({
        id: uuidv4(),
        lowerRank: req.body.lowerRank,
        upperRank: req.body.upperRank,
        referenceRank: req.body.referenceRank,
        sampleId: req.body.sampleId,
        instrumentId: req.body.instrumentId
      })
      .then(instrument => res.status(201).send(instrument))
      .catch(error => res.status(400).send(error))
  },

  update (req, res) {
    return InstrumentMapping
      .findById(req.params.id, {})
      .then(mapping => {
        if (!mapping) {
          return res.status(404).send({
            message: `Failed to retrieve instrument mapping n°${req.params.id}`
          })
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
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  destroy (req, res) {
    return InstrumentMapping
      .findById(req.params.id)
      .then(mapping => {
        if (!mapping) {
          return res.status(404).send({
            message: `Failed to retrieve instrument mapping n°${req.params.id}`
          })
        }
        return mapping
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },
}

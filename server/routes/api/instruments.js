const express = require('express')
const router = express.Router()

const instrumentController = require('../../controllers').instruments
const instrumentMappingsController = require('../../controllers').instrumentMappings

// Instrument
router.get('/', instrumentController.findAll)
router.post('/', instrumentController.create)
router.get('/:id', instrumentController.findById)
router.put('/:id', instrumentController.update)
router.delete('/:id', instrumentController.destroy)

// InstrumentMappings
router.get('/:instrumentId/mappings', instrumentMappingsController.findAll)
router.post('/:instrumentId/mappings', instrumentMappingsController.create)

module.exports = router

const express = require('express')
const router = express.Router()

const {Instrument, InstrumentMapping} = require('../../models/index')
const {
  generateUUID,
  instrumentCreate,
  instrumentDestroy,
  instrumentUpdate,
  instrumentFindById,
  instrumentFindAll,
  instrumentFindAllMapping,
  instrumentMappingCreate,
  instrumentSend
} = require('../../middlewares')

// Instrument
router.get('/', instrumentFindAll(Instrument, InstrumentMapping), instrumentSend)
router.post('/', generateUUID, instrumentCreate(Instrument), instrumentSend)
router.get('/:id', instrumentFindById(Instrument, InstrumentMapping), instrumentSend)
router.put('/:id', instrumentUpdate(Instrument), instrumentSend)
router.delete('/:id', instrumentDestroy(Instrument), instrumentSend)

// InstrumentMappings
router.get('/:instrumentId/mappings', instrumentFindAllMapping(Instrument, InstrumentMapping))
router.post('/:instrumentId/mappings', instrumentMappingCreate(Instrument, InstrumentMapping))

module.exports = router

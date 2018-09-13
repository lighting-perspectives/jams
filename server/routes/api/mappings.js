const express = require('express')
const router = express.Router()

const {InstrumentMapping} = require('../../models/index')

const {
  instrumentMappingDestroy,
  instrumentMappingFindById,
  instrumentMappingUpdate,
  mappingSend
} = require('../../middlewares')

router.get('/:id', instrumentMappingFindById(InstrumentMapping), mappingSend)
router.put('/:id', instrumentMappingUpdate(InstrumentMapping), mappingSend)
router.delete('/:id', instrumentMappingDestroy(InstrumentMapping), mappingSend)

module.exports = router

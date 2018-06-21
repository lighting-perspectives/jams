const express = require('express')
const router = express.Router()

const Sample = require('../../models/index').Sample

const {
  generateUUID, sampleMulter, sampleAddInfos,
  sampleCreate, sampleUpdate, sampleDestroy,
  sampleFindById, sampleFindAll, sampleSend
} = require('../../middlewares')

router.get('/', sampleFindAll(Sample), sampleAddInfos, sampleSend)
router.post('/',
  generateUUID,
  sampleMulter,
  sampleCreate(Sample),
  sampleAddInfos,
  sampleSend
)
router.get('/:id',
  sampleFindById(Sample),
  sampleAddInfos,
  sampleSend
)
router.put('/:id',
  sampleMulter,
  sampleUpdate(Sample),
  sampleAddInfos,
  sampleSend
)
router.delete('/:id',
  sampleDestroy(Sample),
  sampleSend
)

module.exports = router

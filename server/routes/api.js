const express = require('express')
const router = express.Router()

// const middlewares = require('../middlewares')

const instrumentController = require('../controllers').instruments
const instrumentMappingsController = require('../controllers').instrumentMappings

router.get('/', function (req, res, next) {
  res.status(200).send({
    message: 'Welcome to the JAMS server!'
  })
})

// router.param('id', todosValidation.checkId)

// Sample
// router.get('/samples',
//   middlewares.sampleFindAll,
//   middlewares.sampleAddInfos,
//   middlewares.sampleSend
// )
// router.post('/samples',
//   middlewares.generateUUID,
//   middlewares.sampleMulter,
//   middlewares.sampleCreate,
//   middlewares.sampleAddInfos,
//   middlewares.sampleSend
// )
// router.get('/samples/:id',
//   middlewares.sampleFindById,
//   middlewares.sampleAddInfos,
//   middlewares.sampleSend
// )
// router.put('/samples/:id',
//   middlewares.sampleMulter,
//   middlewares.sampleUpdate,
//   middlewares.sampleAddInfos,
//   middlewares.sampleSend
// )
// router.delete('/samples/:id',
//   middlewares.sampleDestroy,
//   middlewares.sampleSend
// )

// // Instrument
// router.get('/instruments', instrumentController.findAll)
// router.post('/instruments', instrumentController.create)
// router.get('/instruments/:id', instrumentController.findById)
// router.put('/instruments/:id', instrumentController.update)
// router.delete('/instruments/:id', instrumentController.destroy)
//
// // InstrumentMappings
// router.get('/instruments/:instrumentId/mappings', instrumentMappingsController.findAll)
// router.post('/instruments/:instrumentId/mappings', instrumentMappingsController.create)
// router.get('/mappings/:id', instrumentMappingsController.findById)
// router.put('/mappings/:id', instrumentMappingsController.update)
// router.delete('/mappings/:id', instrumentMappingsController.destroy)

module.exports = router

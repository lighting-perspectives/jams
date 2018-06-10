const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')

const samplesController = require('../controllers').samples
const instrumentController = require('../controllers').instruments
const instrumentMappingsController = require('../controllers').instrumentMappings

// const todosController = require('../controllers').todos

// const todoItemsController = require('../controllers').todoItems

// const todosValidation = require('../validation').todos
// const createTodoData = require('../form/createTodos')

router.get('/', function (req, res, next) {
  res.status(200).send({
    message: 'Welcome to the JAMS server!'
  })
})

// router.param('id', todosValidation.checkId)

// Sample
router.get('/samples', samplesController.findAll)
router.post('/samples', middlewares.generateUUID, middlewares.sample.multer, samplesController.create)
router.get('/samples/:id', samplesController.findById)
router.put('/samples/:id', middlewares.sample.multer, samplesController.update)
router.delete('/samples/:id', samplesController.destroy)

// Instrument
router.get('/instruments', instrumentController.findAll)
router.post('/instruments', instrumentController.create)
router.get('/instruments/:id', instrumentController.findById)
router.put('/instruments/:id', instrumentController.update)
router.delete('/instruments/:id', instrumentController.destroy)

// InstrumentMappings
router.get('/instruments/:instrumentId/mappings', instrumentMappingsController.findAll)
router.post('/instruments/:instrumentId/mappings', instrumentMappingsController.create)
router.get('/mappings/:id', instrumentMappingsController.findById)
router.put('/mappings/:id', instrumentMappingsController.update)
router.delete('/mappings/:id', instrumentMappingsController.destroy)

module.exports = router

const express = require('express')
const router = express.Router()

const instrumentMappingsController = require('../../controllers').instrumentMappings

router.get('/:id', instrumentMappingsController.findById)
router.put('/:id', instrumentMappingsController.update)
router.delete('/:id', instrumentMappingsController.destroy)

module.exports = router

const sample = require('./sample')
const generateUUID = require('./generateUUID')
const sampleMulter = require('./sample/multer')
const sampleAddInfos = require('./sample/addSampleInfos')
const sampleCreate = require('./sample/model/create')
const sampleUpdate = require('./sample/model/update')
const sampleDestroy = require('./sample/model/destroy')
const sampleFindById = require('./sample/model/findById')
const sampleFindAll = require(('./sample/model/findAll'))
const sampleSend = require('./sample/send')

module.exports = {
  sample,
  generateUUID,
  sampleMulter,
  sampleAddInfos,
  sampleCreate,
  sampleUpdate,
  sampleDestroy,
  sampleFindById,
  sampleFindAll,
  sampleSend
}
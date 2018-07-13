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

const instrumentSend = require('./instrument/send')
const instrumentCreate = require('./instrument/model/create')
const instrumentDestroy = require('./instrument/model/destroy')
const instrumentUpdate = require('./instrument/model/update')
const instrumentFindAllMapping = require('./instrument/model/findAllMapping')

const instrumentMappingCreate = require('./mapping/model/create')
const instrumentMappingFindById = require('./mapping/model/findById')
const instrumentMappingUpdate = require('./mapping/model/update')
const instrumentMappingDestroy = require('./mapping/model/destroy')
const mappingSend = require('./mapping/send')

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
  sampleSend,
  instrumentSend,
  instrumentCreate,
  instrumentDestroy,
  instrumentUpdate,
  instrumentFindAllMapping,
  instrumentMappingCreate,
  instrumentMappingFindById,
  instrumentMappingUpdate,
  instrumentMappingDestroy,
  mappingSend
}

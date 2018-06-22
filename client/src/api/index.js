import { deleteSamples, getSamples, postSamples, putSamples } from './resource/samples'
import { getInstruments, deleteInstruments } from './resource/instruments'

export default {
  getSamples,
  postSamples,
  putSamples,
  deleteSamples,
  getInstruments,
  deleteInstruments
}

export const BASE_URL = 'http://localhost:3000'

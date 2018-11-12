import {
  deleteSamples,
  getSamples,
  postSamples,
  putSamples,
} from "./resource/samples"
import {
  getInstruments,
  postInstruments,
  putInstruments,
  deleteInstruments,
  postInstrumentsMappings,
  deleteMappings,
} from "./resource/instruments"

export default {
  getSamples,
  postSamples,
  putSamples,
  deleteSamples,
  getInstruments,
  postInstruments,
  putInstruments,
  deleteInstruments,
  postInstrumentsMappings,
  deleteMappings,
}

export const BASE_URL = "http://localhost:3000"

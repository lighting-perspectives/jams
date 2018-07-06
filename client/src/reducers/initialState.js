export default {
  samples: {
    sampleList: {samples: [], error: null, loading: false},
    newSample: {sample: null, error: null, loading: false, open: false},
    updatedSample: {sample: null, error: null, loading: false, updated: false},
    activeSample: {sample: null, error: null, loading: false},
    deletedSample: {sample: null, error: null, loading: false}
  },
  instruments: {
    instrumentList: {instruments: [], error: null, loading: false},
    newInstrument: {instrument: null, error: null, loading: false, open: false},
    updatedInstrument: {instrument: null, error: null, loading: false, updated: false},
    activeInstrument: {instrument: null, error: null, loading: false},
    deletedInstrument: {instrument: null, error: null, loading: false, open: false},
    newMapping: {instrumentId: null, mapping: null, error: null, loading: false, open: false},
    deletedMapping: {mapping: null, error: null, loading: false, open: false, done: false}
  }
}

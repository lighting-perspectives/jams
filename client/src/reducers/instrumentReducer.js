import initialState from './initialState'
import {
  FETCH_INSTRUMENTS, FETCH_INSTRUMENTS_SUCCESS, FETCH_INSTRUMENTS_FAILURE, RESET_INSTRUMENTS,
  DELETE_INSTRUMENT, DELETE_INSTRUMENT_SUCCESS, DELETE_INSTRUMENT_FAILURE, RESET_DELETED_INSTRUMENT
} from './../actions/types/instruments'

export default function instrumentReducer (state = initialState.instruments, action) {
  let error

  switch (action.type) {
    case FETCH_INSTRUMENTS:
      console.log(action.type, action.payload)
      return {...state, instrumentList: {instruments: [], error: null, loading: true}}

    case FETCH_INSTRUMENTS_SUCCESS:
      console.log(action.type, action.payload)
      return {...state, instrumentList: {instruments: action.payload, error: null, loading: false}}

    case FETCH_INSTRUMENTS_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, instrumentList: {instruments: [], error, loading: false}}

    case RESET_INSTRUMENTS:
      console.log(action.type, action.payload)
      return {...state, instrumentList: {instruments: [], error: null, loading: false}}

    case DELETE_INSTRUMENT:
      console.log(action.type, action.payload)
      return {...state, deletedInstrument: {...state.deletedInstrument, loading: true}}

    case DELETE_INSTRUMENT_SUCCESS:
      console.log(action.type, action.payload)
      return {...state, deletedInstrument: {instrument: action.payload, error: null, loading: false}}

    case DELETE_INSTRUMENT_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, deletedInstrument: {instrument: null, error, loading: false}}

    case RESET_DELETED_INSTRUMENT:
      console.log(action.type, action.payload)
      return {...state, deletedInstrument: {instrument: null, error: null, loading: false}}

    default:
      return state
  }
}

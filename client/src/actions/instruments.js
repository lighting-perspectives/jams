import api from '../api'
import {
  FETCH_INSTRUMENTS, FETCH_INSTRUMENTS_SUCCESS, FETCH_INSTRUMENTS_FAILURE, RESET_INSTRUMENTS,
  DELETE_INSTRUMENT, DELETE_INSTRUMENT_SUCCESS, DELETE_INSTRUMENT_FAILURE, RESET_DELETED_INSTRUMENT
} from './types/instruments'
import { fetchSamples } from './sample'

function fetchInstrumentsSuccess (samples) {
  return {
    type: FETCH_INSTRUMENTS_SUCCESS,
    payload: samples
  }
}

function fetchInstrumentsFailure (error) {
  return {
    type: FETCH_INSTRUMENTS_FAILURE,
    payload: error
  }
}

function fetchInstrumentsLoading () {
  return {
    type: FETCH_INSTRUMENTS
  }
}

export function fetchInstruments () {
  return dispatch => {
    dispatch(fetchInstrumentsLoading())

    return api.getInstruments()
      .then(instruments => {
        dispatch(fetchInstrumentsSuccess(instruments))
      })
      .catch(error => {
        dispatch(fetchInstrumentsFailure(error))
      })
  }
}

export function resetInstruments () {
  return {
    type: RESET_INSTRUMENTS
  }
}

export function deleteInstrument (instrument) {
  return dispatch => {
    deleteInstrumentLoading()

    return api.deleteInstruments(instrument.id)
      .then(() => {
        dispatch(deleteInstrumentSuccess(instrument))
      })
      .then(() => {
        dispatch(fetchSamples())
      })
      .catch(error => {
        dispatch(deleteInstrumentFailure(error))
      })
  }
}

export function deleteInstrumentLoading () {
  return {
    type: DELETE_INSTRUMENT
  }
}

export function deleteInstrumentSuccess (instrument) {
  return {
    type: DELETE_INSTRUMENT_SUCCESS,
    payload: instrument
  }
}

export function deleteInstrumentFailure (error) {
  return {
    type: DELETE_INSTRUMENT_FAILURE,
    payload: error
  }
}

export function resetDeletedInstrument () {
  return {
    type: RESET_DELETED_INSTRUMENT
  }
}

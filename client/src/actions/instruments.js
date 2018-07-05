import api from '../api'
import {
  FETCH_INSTRUMENTS, FETCH_INSTRUMENTS_SUCCESS, FETCH_INSTRUMENTS_FAILURE,
  CREATE_INSTRUMENT_OPEN_MODAL, CREATE_INSTRUMENT_CLOSE_MODAL,
  DELETE_INSTRUMENT, DELETE_INSTRUMENT_SUCCESS, DELETE_INSTRUMENT_FAILURE,
  RESET_DELETED_INSTRUMENT,
  NEW_MAPPING_OPEN_MODAL, NEW_MAPPING_CLOSE_MODAL,
  CREATE_MAPPING, CREATE_MAPPING_SUCCESS, CREATE_MAPPING_FAILURE,
  RESET_NEW_MAPPING,
  CREATE_INSTRUMENT_SUCCESS, CREATE_INSTRUMENT_FAILURE, CREATE_INSTRUMENT,
  UPDATE_INSTRUMENT_OPEN_MODAL, UPDATE_INSTRUMENT_CLOSE_MODAL,
  UPDATE_INSTRUMENT_SUCCESS, UPDATE_INSTRUMENT_FAILURE, UPDATE_INSTRUMENT,
  RESET_NEW_INSTRUMENT,
  RESET_UPDATED_INSTRUMENT,
  DELETE_MAPPING, DELETE_MAPPING_SUCCESS, DELETE_MAPPING_FAILURE,
  RESET_DELETED_MAPPING,
  DELETE_MAPPING_OPEN_CONFIRM
} from './types/instruments'

const MSG_TIMEOUT = 5000

/********************************************
 *               INSTRUMENTS                *
 ********************************************/

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

/********************************************
 *            CREATE INSTRUMENT             *
 ********************************************/

export function createInstrumentOpenModal () {
  return {
    type: CREATE_INSTRUMENT_OPEN_MODAL
  }
}

export function createInstrumentCloseModal () {
  return {
    type: CREATE_INSTRUMENT_CLOSE_MODAL
  }
}

function createInstrumentLoading () {
  return {
    type: CREATE_INSTRUMENT
  }
}

function createInstrumentSuccess (instrument) {
  return {
    type: CREATE_INSTRUMENT_SUCCESS,
    payload: instrument
  }
}

function createInstrumentFailure (error) {
  return {
    type: CREATE_INSTRUMENT_FAILURE,
    payload: error
  }
}

export function resetNewInstrument () {
  return {
    type: RESET_NEW_INSTRUMENT
  }
}

export function createInstrument (formData) {
  return function (dispatch) {
    dispatch(createInstrumentLoading())

    return api.postInstruments(formData)
      .then(instrument => {
        dispatch(createInstrumentSuccess(instrument))
      })
      .then(() => {
        dispatch(fetchInstruments())
      })
      .then(() => {
        dispatch(createInstrumentCloseModal())

        setTimeout(() => {
          dispatch(resetNewInstrument())
        }, MSG_TIMEOUT)
      })
      .catch(error => {
        console.log('error', error)
        dispatch(createInstrumentFailure(error))
      })
  }
}

/********************************************
 *            UPDATE INSTRUMENT             *
 ********************************************/

export function updateInstrumentOpenModal (instrument) {
  return {
    type: UPDATE_INSTRUMENT_OPEN_MODAL,
    payload: instrument
  }
}

export function updateInstrumentCloseModal () {
  return {
    type: UPDATE_INSTRUMENT_CLOSE_MODAL
  }
}

function updateInstrumentSuccess (instrument) {
  return {
    type: UPDATE_INSTRUMENT_SUCCESS,
    payload: instrument
  }
}

function updateInstrumentFailure (error) {
  return {
    type: UPDATE_INSTRUMENT_FAILURE,
    payload: error
  }
}

function updateInstrumentLoading () {
  return {
    type: UPDATE_INSTRUMENT
  }
}

export function resetUpdatedInstrument () {
  return {
    type: RESET_UPDATED_INSTRUMENT
  }
}

export function updateInstrument (id, formData) {
  return function (dispatch) {
    dispatch(updateInstrumentLoading())

    return api.putInstruments(id, formData)
      .then(instrument => {
        dispatch(updateInstrumentSuccess(instrument))
      })
      .then(() => {
        dispatch(fetchInstruments())
      })
      .then(() => {
        dispatch(updateInstrumentCloseModal())

        setTimeout(() => {
          dispatch(resetUpdatedInstrument())
        }, MSG_TIMEOUT)
      })
      .catch(error => {
        console.log('error', error)
        dispatch(updateInstrumentFailure(error))
      })
  }
}

/********************************************
 *            DELETE INSTRUMENT             *
 ********************************************/

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

export function deleteInstrument (instrument) {
  return dispatch => {
    deleteInstrumentLoading()

    return api.deleteInstruments(instrument.id)
      .then(() => {
        dispatch(deleteInstrumentSuccess(instrument))
      })
      .then(() => {
        dispatch(fetchInstruments())

        setTimeout(() => {
          dispatch(resetDeletedInstrument())
        }, MSG_TIMEOUT)
      })
      .catch(error => {
        dispatch(deleteInstrumentFailure(error))
      })
  }
}

/********************************************
 *              CREATE MAPPING              *
 ********************************************/

export function createMappingOpenModal (instrumentId) {
  return {
    type: NEW_MAPPING_OPEN_MODAL,
    payload: instrumentId
  }
}

export function createMappingCloseModal (instrumentId) {
  return {
    type: NEW_MAPPING_CLOSE_MODAL,
    payload: instrumentId
  }
}

export function createMappingLoading () {
  return {
    type: CREATE_MAPPING
  }
}
export function createMappingSuccess (instrumentId, mapping) {
  return {
    type: CREATE_MAPPING_SUCCESS,
    payload: { mapping, instrumentId }
  }
}

export function createMappingFailure (error) {
  return {
    type: CREATE_MAPPING_FAILURE,
    payload: error
  }
}

export function resetNewMapping () {
  return {
    type: RESET_NEW_MAPPING
  }
}

export function createMapping (instrumentId, formData) {
  return function (dispatch) {
    dispatch(createMappingLoading())

    return api.postInstrumentsMappings(instrumentId, formData)
      .then(mapping => {
        dispatch(createMappingSuccess(instrumentId, mapping))
      })
      .then(() => {
        dispatch(fetchInstruments())
      })
      .then(() => {
        dispatch(createMappingCloseModal(instrumentId))

        setTimeout(() => {
          dispatch(resetNewMapping())
        }, MSG_TIMEOUT)
      })
      .catch(error => {
        dispatch(createMappingFailure(error))
      })
  }
}

/********************************************
 *              DELETE MAPPING              *
 ********************************************/

export function deleteMappingOpenConfirm (mapping) {
  return {
    type: DELETE_MAPPING_OPEN_CONFIRM,
    payload: mapping
  }
}

export function deleteMappingLoading () {
  return {
    type: DELETE_MAPPING
  }
}

export function deleteMappingSuccess (instrument) {
  return {
    type: DELETE_MAPPING_SUCCESS,
    payload: instrument
  }
}

export function deleteMappingFailure (error) {
  return {
    type: DELETE_MAPPING_FAILURE,
    payload: error
  }
}

export function resetDeletedMapping () {
  return {
    type: RESET_DELETED_MAPPING
  }
}

export function deleteMapping (mapping) {
  return dispatch => {
    deleteMappingLoading()

    return api.deleteMappings(mapping.id)
      .then(() => {
        dispatch(deleteMappingSuccess(mapping))
      })
      .then(() => {
        dispatch(fetchInstruments())

        setTimeout(() => {
          dispatch(resetDeletedMapping())
        }, MSG_TIMEOUT)
      })
      .catch(error => {
        dispatch(deleteMappingFailure(error))
      })
  }
}

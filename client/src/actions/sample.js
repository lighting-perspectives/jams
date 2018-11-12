import api from "../api"

import {
  FETCH_SAMPLES,
  FETCH_SAMPLES_SUCCESS,
  FETCH_SAMPLES_FAILURE,
  SHOW_NEW_SAMPLE_MODAL,
  CLOSE_NEW_SAMPLE_MODAL,
  CREATE_SAMPLE,
  CREATE_SAMPLE_SUCCESS,
  CREATE_SAMPLE_FAILURE,
  RESET_NEW_SAMPLE,
  SHOW_EDIT_SAMPLE_MODAL,
  CLOSE_EDIT_SAMPLE_MODAL,
  SELECT_SAMPLE_TO_UPDATE,
  UPDATE_SAMPLE,
  UPDATE_SAMPLE_SUCCESS,
  UPDATE_SAMPLE_FAILURE,
  RESET_UPDATED_SAMPLE,
  DELETE_SAMPLE,
  DELETE_SAMPLE_SUCCESS,
  DELETE_SAMPLE_FAILURE,
  RESET_DELETED_SAMPLE,
} from "./types/samples"

function fetchSamplesSuccess(samples) {
  return {
    type: FETCH_SAMPLES_SUCCESS,
    payload: samples,
  }
}

function fetchSamplesFailure(error) {
  return {
    type: FETCH_SAMPLES_FAILURE,
    payload: error,
  }
}

function fetchSamplesLoading() {
  return {
    type: FETCH_SAMPLES,
    // payload: api.getSamples()
  }
}

export function fetchSamples() {
  return function(dispatch) {
    dispatch(fetchSamplesLoading())

    return api
      .getSamples()
      .then(samples => {
        dispatch(fetchSamplesSuccess(samples))
      })
      .catch(error => {
        dispatch(fetchSamplesFailure(error))
      })
  }
}

export function createSampleShowModal() {
  return {
    type: SHOW_NEW_SAMPLE_MODAL,
  }
}

export function createSampleCloseModal() {
  return {
    type: CLOSE_NEW_SAMPLE_MODAL,
  }
}

function createSampleSuccess(sample) {
  return {
    type: CREATE_SAMPLE_SUCCESS,
    payload: sample,
  }
}

function createSampleFailure(error) {
  return {
    type: CREATE_SAMPLE_FAILURE,
    payload: error,
  }
}

function createSampleLoading() {
  return {
    type: CREATE_SAMPLE,
  }
}

export function createSample(formData) {
  return function(dispatch) {
    dispatch(createSampleLoading())

    return api
      .postSamples(formData)
      .then(sample => {
        dispatch(createSampleSuccess(sample))
      })
      .then(() => {
        dispatch(fetchSamples())
      })
      .then(() => {
        dispatch(createSampleCloseModal())
      })
      .catch(error => {
        console.log("error", error)
        dispatch(createSampleFailure(error))
      })
  }
}

export function resetNewSample() {
  return {
    type: RESET_NEW_SAMPLE,
  }
}

export function updateSampleShowModal(sample) {
  return {
    type: SHOW_EDIT_SAMPLE_MODAL,
    payload: sample,
  }
}

export function updateSampleCloseModal() {
  return {
    type: CLOSE_EDIT_SAMPLE_MODAL,
  }
}

function updateSampleSuccess(sample) {
  return {
    type: UPDATE_SAMPLE_SUCCESS,
    payload: sample,
  }
}

function updateSampleFailure(error) {
  return {
    type: UPDATE_SAMPLE_FAILURE,
    payload: error,
  }
}

function updateSampleLoading() {
  return {
    type: UPDATE_SAMPLE,
  }
}

export function selectSampleToUpdate(sample) {
  return {
    type: SELECT_SAMPLE_TO_UPDATE,
    payload: sample,
  }
}

export function updateSample(id, formData) {
  return dispatch => {
    dispatch(updateSampleLoading())

    return api
      .putSamples(id, formData)
      .then(sample => {
        dispatch(updateSampleSuccess(sample))
      })
      .then(() => {
        dispatch(fetchSamples())
      })
      .then(() => {
        dispatch(updateSampleCloseModal())
      })
      .catch(error => {
        console.log("error", error)
        dispatch(updateSampleFailure(error))
      })
  }
}

export function resetUpdatedSample() {
  return {
    type: RESET_UPDATED_SAMPLE,
  }
}

function deleteSampleSuccess(data) {
  return {
    type: DELETE_SAMPLE_SUCCESS,
    payload: data,
  }
}

function deleteSampleFailure(error) {
  return {
    type: DELETE_SAMPLE_FAILURE,
    payload: error,
  }
}

function deleteSampleLoading() {
  return {
    type: DELETE_SAMPLE,
  }
}

export function deleteSample(data) {
  return dispatch => {
    dispatch(deleteSampleLoading())

    return api
      .deleteSamples(data)
      .then(() => {
        console.log(`Deleted ${data.id}`)
        dispatch(deleteSampleSuccess(data))
      })
      .then(() => {
        dispatch(fetchSamples())
      })
      .catch(error => {
        console.log("error", error)
        dispatch(deleteSampleFailure(error))
      })
  }
}

export function resetDeletedSample() {
  return {
    type: RESET_DELETED_SAMPLE,
  }
}

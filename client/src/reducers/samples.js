import {
  FETCH_SAMPLES, FETCH_SAMPLES_SUCCESS, FETCH_SAMPLES_FAILURE, RESET_SAMPLES,
  CREATE_SAMPLE, CREATE_SAMPLE_SUCCESS, CREATE_SAMPLE_FAILURE, RESET_NEW_SAMPLE,
  SELECT_SAMPLE_TO_UPDATE, UPDATE_SAMPLE, UPDATE_SAMPLE_SUCCESS, UPDATE_SAMPLE_FAILURE, RESET_UPDATED_SAMPLE,
  DELETE_SAMPLE, DELETE_SAMPLE_SUCCESS, DELETE_SAMPLE_FAILURE, RESET_DELETED_SAMPLE
} from '../actions/actionTypes'
import initialState from './initialState'

export default function samples (state = initialState.samples, action) {
  let error
  console.log(action.type, action.payload)
  switch (action.type) {
    case FETCH_SAMPLES:
      return {...state, sampleList: {samples: [], error: null, loading: true}}

    case FETCH_SAMPLES_SUCCESS:
      return {...state, sampleList: {samples: action.payload, error: null, loading: false}}

    case FETCH_SAMPLES_FAILURE:
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, sampleList: {samples: [], error, loading: false}}

    case RESET_SAMPLES:
      return {...state, sampleList: {samples: [], error: null, loading: false}}

    case CREATE_SAMPLE:
      return {...state, newSample: {...state.newSample, loading: true}}

    case CREATE_SAMPLE_SUCCESS:
      return {...state, newSample: {sample: action.payload, error: null, loading: false}}

    case CREATE_SAMPLE_FAILURE:
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, newSample: {sample: null, error, loading: false}}

    case RESET_NEW_SAMPLE:
      return {...state, newSample: {sample: null, error: null, loading: false}}

    case SELECT_SAMPLE_TO_UPDATE:
      return {...state, updatedSample: {sample: action.payload, error: null, loading: false, updated: false}}

    case UPDATE_SAMPLE:
      return {...state, updatedSample: {...state.updatedSample, loading: true}}

    case UPDATE_SAMPLE_SUCCESS:
      return {...state, updatedSample: {sample: action.payload, error: null, loading: false, updated: true}}

    case UPDATE_SAMPLE_FAILURE:
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, updatedSample: {sample: null, error, loading: false, updated: false}}

    case RESET_UPDATED_SAMPLE:
      return {...state, updatedSample: {sample: null, error: null, loading: false, updated: false}}

    case DELETE_SAMPLE:
      return {...state, deletedSample: {...state.deletedSample, loading: true}}

    case DELETE_SAMPLE_SUCCESS:
      return {...state, deletedSample: {sample: action.payload, error: null, loading: false}}

    case DELETE_SAMPLE_FAILURE:
      error = action.payload || {message: action.payload.message} // 2nd one is network or server down errors
      return {...state, deletedSample: {sample: null, error, loading: false}}

    case RESET_DELETED_SAMPLE:
      return {...state, deletedSample: {sample: null, error: null, loading: false}}

    // case types.UPDATE_SAMPLE:
    //   return [
    //     ...state.filter(sample => sample.id !== action.sample.id),
    //     Object.assign({}, action.sample)
    //   ]
    //
    // case types.DELETE_SAMPLE: {
    //   const newState = Object.assign([], state)
    //   const deletedSampleIndex = state.findIndex(sample => {
    //     return sample.id === action.sample.id
    //   })
    //   newState.splice(deletedSampleIndex, 1)
    //   return newState
    // }

    default:
      return state
  }
}

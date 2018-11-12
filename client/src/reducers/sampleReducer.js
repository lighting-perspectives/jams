import {
  FETCH_SAMPLES,
  FETCH_SAMPLES_SUCCESS,
  FETCH_SAMPLES_FAILURE,
  CREATE_SAMPLE,
  CREATE_SAMPLE_SUCCESS,
  CREATE_SAMPLE_FAILURE,
  RESET_NEW_SAMPLE,
  SELECT_SAMPLE_TO_UPDATE,
  UPDATE_SAMPLE,
  UPDATE_SAMPLE_SUCCESS,
  UPDATE_SAMPLE_FAILURE,
  RESET_UPDATED_SAMPLE,
  DELETE_SAMPLE,
  DELETE_SAMPLE_SUCCESS,
  DELETE_SAMPLE_FAILURE,
  RESET_DELETED_SAMPLE,
  SHOW_NEW_SAMPLE_MODAL,
  CLOSE_NEW_SAMPLE_MODAL,
  SHOW_EDIT_SAMPLE_MODAL,
  CLOSE_EDIT_SAMPLE_MODAL,
} from "../actions/types/samples"
import initialState from "./initialState"

export default function samples(state = initialState.samples, action) {
  let error

  switch (action.type) {
    case FETCH_SAMPLES:
      console.log(action.type, action.payload)
      return {
        ...state,
        sampleList: { samples: [], error: null, loading: true },
      }

    case FETCH_SAMPLES_SUCCESS:
      console.log(action.type, action.payload)
      return {
        ...state,
        sampleList: { samples: action.payload, error: null, loading: false },
      }

    case FETCH_SAMPLES_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return { ...state, sampleList: { samples: [], error, loading: false } }

    case SHOW_NEW_SAMPLE_MODAL:
      console.log(action.type, action.payload)
      return { ...state, newSample: { ...state.newSample, open: true } }

    case CLOSE_NEW_SAMPLE_MODAL:
      console.log(action.type, action.payload)
      return { ...state, newSample: { ...state.newSample, open: false } }

    case CREATE_SAMPLE:
      console.log(action.type, action.payload)
      return { ...state, newSample: { ...state.newSample, loading: true } }

    case CREATE_SAMPLE_SUCCESS:
      console.log(action.type, action.payload)
      return {
        ...state,
        newSample: {
          ...state.newSample,
          sample: action.payload,
          error: null,
          loading: false,
        },
      }

    case CREATE_SAMPLE_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        newSample: { ...state.newSample, sample: null, error, loading: false },
      }

    case RESET_NEW_SAMPLE:
      console.log(action.type, action.payload)
      return {
        ...state,
        newSample: { sample: null, error: null, loading: false, open: false },
      }

    case SELECT_SAMPLE_TO_UPDATE:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: {
          ...state.updatedSample,
          sample: action.payload,
          error: null,
          loading: false,
          updated: false,
        },
      }

    case SHOW_EDIT_SAMPLE_MODAL:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: {
          sample: action.payload,
          error: null,
          loading: false,
          updated: false,
          open: true,
        },
      }

    case CLOSE_EDIT_SAMPLE_MODAL:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: { ...state.updatedSample, open: false },
      }

    case UPDATE_SAMPLE:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: { ...state.updatedSample, loading: true },
      }

    case UPDATE_SAMPLE_SUCCESS:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: {
          ...state.updatedSample,
          sample: action.payload,
          error: null,
          loading: false,
          updated: true,
        },
      }

    case UPDATE_SAMPLE_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        updatedSample: {
          ...state.updatedSample,
          sample: null,
          error,
          loading: false,
          updated: false,
        },
      }

    case RESET_UPDATED_SAMPLE:
      console.log(action.type, action.payload)
      return {
        ...state,
        updatedSample: {
          sample: null,
          error: null,
          loading: false,
          updated: false,
          open: false,
        },
      }

    case DELETE_SAMPLE:
      console.log(action.type, action.payload)
      return {
        ...state,
        deletedSample: { ...state.deletedSample, loading: true },
      }

    case DELETE_SAMPLE_SUCCESS:
      console.log(action.type, action.payload)
      return {
        ...state,
        deletedSample: { sample: action.payload, error: null, loading: false },
      }

    case DELETE_SAMPLE_FAILURE:
      console.log(action.type, action.payload)
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        deletedSample: { sample: null, error, loading: false },
      }

    case RESET_DELETED_SAMPLE:
      console.log(action.type, action.payload)
      return {
        ...state,
        deletedSample: { sample: null, error: null, loading: false },
      }

    default:
      return state
  }
}

import initialState from "./initialState"
import {
  FETCH_INSTRUMENTS,
  FETCH_INSTRUMENTS_SUCCESS,
  FETCH_INSTRUMENTS_FAILURE,
  DELETE_INSTRUMENT,
  DELETE_INSTRUMENT_SUCCESS,
  DELETE_INSTRUMENT_FAILURE,
  RESET_DELETED_INSTRUMENT,
  NEW_MAPPING_OPEN_MODAL,
  NEW_MAPPING_CLOSE_MODAL,
  CREATE_MAPPING,
  CREATE_MAPPING_SUCCESS,
  CREATE_MAPPING_FAILURE,
  RESET_NEW_MAPPING,
  CREATE_INSTRUMENT_OPEN_MODAL,
  CREATE_INSTRUMENT_CLOSE_MODAL,
  CREATE_INSTRUMENT,
  CREATE_INSTRUMENT_SUCCESS,
  CREATE_INSTRUMENT_FAILURE,
  RESET_NEW_INSTRUMENT,
  DELETE_MAPPING,
  DELETE_MAPPING_SUCCESS,
  DELETE_MAPPING_FAILURE,
  RESET_DELETED_MAPPING,
  UPDATE_INSTRUMENT_OPEN_MODAL,
  UPDATE_INSTRUMENT_CLOSE_MODAL,
  UPDATE_INSTRUMENT,
  UPDATE_INSTRUMENT_SUCCESS,
  UPDATE_INSTRUMENT_FAILURE,
  RESET_UPDATED_INSTRUMENT,
  DELETE_MAPPING_OPEN_CONFIRM,
  DELETE_INSTRUMENT_OPEN_CONFIRM,
} from "./../actions/types/instruments"

export default function instrumentReducer(
  state = initialState.instruments,
  action
) {
  let error

  switch (action.type) {
    case FETCH_INSTRUMENTS:
      return {
        ...state,
        instrumentList: { instruments: [], error: null, loading: true },
      }

    case FETCH_INSTRUMENTS_SUCCESS:
      return {
        ...state,
        instrumentList: {
          instruments: action.payload,
          error: null,
          loading: false,
        },
      }

    case FETCH_INSTRUMENTS_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        instrumentList: { instruments: [], error, loading: false },
      }

    case CREATE_INSTRUMENT_OPEN_MODAL:
      return { ...state, newInstrument: { ...state.newInstrument, open: true } }

    case CREATE_INSTRUMENT_CLOSE_MODAL:
      return {
        ...state,
        newInstrument: { ...state.newInstrument, open: false },
      }

    case CREATE_INSTRUMENT:
      return {
        ...state,
        newInstrument: { ...state.newInstrument, loading: true },
      }

    case CREATE_INSTRUMENT_SUCCESS:
      return {
        ...state,
        newInstrument: {
          ...state.newInstrument,
          instrument: action.payload,
          error: null,
          loading: false,
        },
      }

    case CREATE_INSTRUMENT_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        newInstrument: {
          ...state.newInstrument,
          instrument: null,
          error,
          loading: false,
        },
      }

    case RESET_NEW_INSTRUMENT:
      return {
        ...state,
        newInstrument: {
          instrument: null,
          error: null,
          loading: false,
          open: false,
        },
      }

    case UPDATE_INSTRUMENT_OPEN_MODAL:
      return {
        ...state,
        updatedInstrument: {
          ...state.updatedInstrument,
          instrument: action.payload,
          open: true,
        },
      }

    case UPDATE_INSTRUMENT_CLOSE_MODAL:
      return {
        ...state,
        updatedInstrument: { ...state.updatedInstrument, open: false },
      }

    case UPDATE_INSTRUMENT:
      return {
        ...state,
        updatedInstrument: { ...state.updatedInstrument, loading: true },
      }

    case UPDATE_INSTRUMENT_SUCCESS:
      return {
        ...state,
        updatedInstrument: {
          ...state.updatedInstrument,
          instrument: action.payload,
          error: null,
          loading: false,
          updated: true,
        },
      }

    case UPDATE_INSTRUMENT_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        updatedInstrument: {
          ...state.updatedInstrument,
          instrument: null,
          error,
          loading: false,
          updated: false,
        },
      }

    case RESET_UPDATED_INSTRUMENT:
      return {
        ...state,
        updatedInstrument: {
          instrument: null,
          error: null,
          loading: false,
          open: false,
          updated: false,
        },
      }

    case DELETE_INSTRUMENT_OPEN_CONFIRM:
      return {
        ...state,
        deletedInstrument: {
          ...state.deletedInstrument,
          instrument: action.payload,
          open: true,
        },
      }

    case DELETE_INSTRUMENT:
      return {
        ...state,
        deletedInstrument: { ...state.deletedInstrument, loading: true },
      }

    case DELETE_INSTRUMENT_SUCCESS:
      return {
        ...state,
        deletedInstrument: {
          instrument: action.payload,
          error: null,
          loading: false,
        },
      }

    case DELETE_INSTRUMENT_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        deletedInstrument: { instrument: null, error, loading: false },
      }

    case RESET_DELETED_INSTRUMENT:
      return {
        ...state,
        deletedInstrument: {
          instrument: null,
          error: null,
          loading: false,
          open: false,
        },
      }

    case NEW_MAPPING_OPEN_MODAL:
      return {
        ...state,
        newMapping: {
          ...state.newMapping,
          instrumentId: action.payload,
          open: true,
        },
      }

    case NEW_MAPPING_CLOSE_MODAL:
      return {
        ...state,
        newMapping: {
          ...state.newMapping,
          instrumentId: action.payload,
          open: false,
        },
      }

    case CREATE_MAPPING:
      return { ...state, newMapping: { ...state.newMapping, loading: true } }

    case CREATE_MAPPING_SUCCESS:
      return {
        ...state,
        newMapping: {
          ...state.newMapping,
          instrumentId: action.payload.instrumentId,
          mapping: action.payload.mapping,
          error: null,
          loading: false,
        },
      }

    case CREATE_MAPPING_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        newMapping: {
          ...state.newMapping,
          mapping: null,
          error,
          loading: false,
        },
      }

    case RESET_NEW_MAPPING:
      return {
        ...state,
        newMapping: {
          instrumentId: null,
          mapping: null,
          error: null,
          loading: false,
          open: false,
        },
      }

    case DELETE_MAPPING_OPEN_CONFIRM:
      return {
        ...state,
        deletedMapping: {
          ...state.deletedMapping,
          mapping: action.payload,
          open: true,
        },
      }

    case DELETE_MAPPING:
      return {
        ...state,
        deletedMapping: { ...state.deletedMapping, loading: true },
      }

    case DELETE_MAPPING_SUCCESS:
      return {
        ...state,
        deletedMapping: {
          mapping: action.payload,
          error: null,
          loading: false,
        },
      }

    case DELETE_MAPPING_FAILURE:
      error = action.payload || { message: action.payload.message } // 2nd one is network or server down errors
      return {
        ...state,
        deletedMapping: { mapping: null, error, loading: false },
      }

    case RESET_DELETED_MAPPING:
      return {
        ...state,
        deletedMapping: {
          mapping: null,
          error: null,
          loading: false,
          open: false,
        },
      }

    default:
      return state
  }
}

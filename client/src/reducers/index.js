import { combineReducers } from 'redux'
import instrumentReducer from './instrumentReducer'
import sampleReducer from './sampleReducer'

const rootReducer = combineReducers({
  samples: sampleReducer,
  instruments: instrumentReducer
})

export default rootReducer

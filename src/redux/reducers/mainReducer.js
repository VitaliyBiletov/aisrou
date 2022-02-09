import {combineReducers} from 'redux'
import {diagnosticReducer} from "./diagnosticReducer";

export default combineReducers({
  diagnostic: diagnosticReducer
})
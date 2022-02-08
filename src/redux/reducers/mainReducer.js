import {combineReducers} from 'redux'
import {diagReducer} from "./diagReducer";

export default combineReducers({
  diag: diagReducer
})
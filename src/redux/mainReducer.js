import {combineReducers} from 'redux'
import {diagReducer} from "../pages/diag/diagReducer";

export default combineReducers({
  diag: diagReducer
})
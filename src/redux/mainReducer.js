import {combineReducers} from 'redux'
import {diagReducer} from "../pages/diag/redux/diagReducer";

export default combineReducers({
  diag: diagReducer
})
import {combineReducers} from 'redux'
import {UserReducer} from "./userReducer";
import {DiagnosticReducer} from "./diagnosticReducer";

export default combineReducers({
    user: UserReducer,
    diagnostic: DiagnosticReducer
})
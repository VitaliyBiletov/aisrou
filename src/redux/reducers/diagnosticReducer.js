import {combineReducers} from "redux";
import {SubsectionReducer} from "./subsectionReducer";

export const DiagnosticReducer = combineReducers({
  subsections: SubsectionReducer
})
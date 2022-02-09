import {combineReducers} from "redux";
import {SubsectionReducer} from "./subsectionReducer";

export const diagnosticReducer = combineReducers({
  subsections: SubsectionReducer
})
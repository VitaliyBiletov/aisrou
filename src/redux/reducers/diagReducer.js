import {combineReducers} from "redux";
import {SubsectionReducer} from "./subsectionReducer";

export const diagReducer = combineReducers({
  subsections: SubsectionReducer
})
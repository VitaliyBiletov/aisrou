import {combineReducers} from "redux";
import {SubsectionReducer} from "../../components/sections/subsection/subsectionReducer";

export const diagReducer = combineReducers({
  subsections: SubsectionReducer
})
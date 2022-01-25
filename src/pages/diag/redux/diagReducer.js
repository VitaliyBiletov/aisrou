import {combineReducers} from "redux";
import {SubsectionReducer} from "../../../components/subsection/subsectionReducer";

export const diagReducer = combineReducers({
  subsections: SubsectionReducer
})
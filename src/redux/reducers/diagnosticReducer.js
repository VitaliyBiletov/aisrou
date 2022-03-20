import {combineReducers} from "redux";
import {TasksReducer} from "./tasksReducer";
import {InfoReducer} from "./infoReducer";


export const DiagnosticReducer = combineReducers({
  info: InfoReducer,
  tasks: TasksReducer,
})
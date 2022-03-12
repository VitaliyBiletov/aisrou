import {combineReducers} from "redux";
import {TasksReducer} from "./tasksReducer";

export const DiagnosticReducer = combineReducers({
  tasks: TasksReducer,
})
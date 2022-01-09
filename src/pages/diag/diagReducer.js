import {combineReducers} from "redux";
import {SensMotorReducer} from "../../components/sections/sensmotor/SensMotorReducer";

export const diagReducer = combineReducers({
  sensMotor: SensMotorReducer
})
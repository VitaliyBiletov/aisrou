import {SET_DATE, SET_STUDENT, SET_INFO_DATA} from "../types/infoTypes";

const initialState = {
  student: {},
  data: [],
}

export function InfoReducer(state = initialState, action){
  switch (action.type){
    case SET_STUDENT:
      return Object.assign({}, state, {student: action.payload})
    case SET_INFO_DATA:
      return Object.assign({}, state, {data: action.payload})
    default: return state
  }
}
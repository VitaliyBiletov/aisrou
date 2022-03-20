import {SET_DATE, SET_STUDENT, SET_FORM_DATA} from "../types/infoTypes";

const initialState = {
  student: {},
  date: null,
  type: null,
  classNumber: null,
}

export function InfoReducer(state = initialState, action){
  switch (action.type){
    case SET_STUDENT:
      return Object.assign({}, state, {student: action.payload})
    case SET_FORM_DATA:
      return Object.assign({}, state, action.payload)
    default: return state
  }
}
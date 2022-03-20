import {SET_DATE, SET_STUDENT, SET_FORM_DATA} from "../types/infoTypes";

export function setStudent(student) {
  return {
    type: SET_STUDENT,
    payload: student
  }
}

export function setFormData(data) {
  return {
    type: SET_FORM_DATA,
    payload: data
  }
}




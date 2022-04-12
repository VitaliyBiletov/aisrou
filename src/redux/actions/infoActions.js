import {SET_PROGRESS_DATA, SET_STUDENT, SET_INFO_DATA} from "../types/infoTypes";

export function setStudent(student) {
  return {
    type: SET_STUDENT,
    payload: student
  }
}

export function setInfoData(data) {
  return {
    type: SET_INFO_DATA,
    payload: data
  }
}
export function setProgress(progress) {
  return {
    type: SET_PROGRESS_DATA,
    payload: progress
  }
}




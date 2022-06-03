import {SET_USER} from "../types/userTypes";


export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}
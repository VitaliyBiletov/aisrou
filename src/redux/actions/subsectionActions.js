import {SET_VALUE_ITEM, SET_VALUE_STATE_FUNC} from "../types/subsectionTypes";


export function setValueItem(id, section, name, value){
  return {
    type: SET_VALUE_ITEM,
    payload: {id, section, name, value}
  }
}

export function setValueStatFunc(name, value) {
  return {
    type: SET_VALUE_STATE_FUNC,
    payload: {name, value}
  }
}
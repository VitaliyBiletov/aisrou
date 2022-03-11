import {SET_VALUE_ITEM, SET_VALUE_STATE_FUNC, SET_SPEED_READING, SET_READING_SKILL} from "../types/subsectionTypes";


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

export function setSpeedReading(value) {
  return {
    type: SET_SPEED_READING,
    payload: value
  }
}

export function setReadingSkill(name, value) {
  return {
    type: SET_READING_SKILL,
    payload: {name, value}
  }
}




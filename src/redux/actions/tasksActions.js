import {
  SET_VALUE_ITEM,
  SET_VALUE_STATE_FUNC,
  SET_SPEED_READING,
  SET_SKILL,
  STATE_LOADING,
  RESET_TASKS, RESET_SKILLS
} from "../types/tasksTypes";


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

export function setSkill(type, name, taskName, value) {
  console.log({type, name, taskName, value})
  return {
    type: SET_SKILL,
    payload: {type, name, taskName, value}
  }
}

export function resetSkills(type, name, taskName, value) {
  return {
    type: RESET_SKILLS,
    payload: {type, name, taskName, value}
  }
}

export function stateLoading(data) {
  return {
    type: STATE_LOADING,
    payload: data
  }
}

export function resetState() {
  return {
    type: RESET_TASKS
  }
}




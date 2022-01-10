import {SET_ACTIVE_ITEM, SET_NEXT_ITEM, SET_VALUE_ITEM} from "./diagTypes";


export function setActiveItem(name, index){
  return {
    type: SET_ACTIVE_ITEM,
    index,
    name
  }
}

export function setNextItem(name, count){
  return {
    type: SET_NEXT_ITEM,
    name,
    count
  }
}

export function setValueItem(id, name, value){
  return {
    type: SET_VALUE_ITEM,
    id,
    name,
    value
  }
}
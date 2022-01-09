import {SET_ACTIVE_ITEM} from "./types";


export function setActiveItem(name, index){
  return {
    type: SET_ACTIVE_ITEM,
    index,
    name
  }
}
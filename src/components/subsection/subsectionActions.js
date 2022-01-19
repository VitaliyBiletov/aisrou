import {SET_VALUE_ITEM} from "./subsectionTypes";


export function setValueItem(id, section, name, value){
  return {
    type: SET_VALUE_ITEM,
    payload: {id, section, name, value}
  }
}
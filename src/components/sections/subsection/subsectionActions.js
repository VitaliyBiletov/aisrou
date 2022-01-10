import {SET_VALUE_ITEM} from "./subsectionTypes";


export function setValueItem(id, name, value){
  return {
    type: SET_VALUE_ITEM,
    payload: {id, name, value}
  }
}
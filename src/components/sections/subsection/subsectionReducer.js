import {SET_VALUE_ITEM} from "./subsectionTypes";

const initialState = {
    "artic":[],
    "phonemics":[],
    "sounds":[],
    "syllable":[],
}

export function SubsectionReducer(state = initialState, action){

  switch (action.type){

    case SET_VALUE_ITEM:
      const {name, id, value} = action.payload
      if(!!state[name].find(i=>i.id===id)){
      const newData = state[name].map(i=>i.id === id ? {id: id, value: value} : i)
        return {...state, [name]: newData}
    } else {
      return {...state, [name]: [...state[name], {id, value}]}
    }

    default: return state
  }
}
import {SET_ACTIVE_ITEM} from "../../../pages/diag/types";

const initialState = {
  subsections:[
    {name: 'artic', activeItem: 0},
    {name: 'phonemics', activeItem: 0},
    {name: 'sounds', activeItem: 0},
    {name: 'syllable', activeItem: 0},
  ]
}

export function SensMotorReducer(state = initialState, action){
  switch (action.type){
    case SET_ACTIVE_ITEM:
      return Object.assign({}, state, {
        subsections: state.subsections.map(s=>{
          if (s.name === action.name){
            s.activeItem = action.index
            return s
          }
          return s
        })
      })
    default: return state
  }
}
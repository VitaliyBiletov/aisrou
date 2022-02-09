import {SET_USER} from "../types/userTypes";

const initialState = {
  id:'',
  role: '',
  isAuth: false
}

export function UserReducer(state = initialState, action){
  switch (action.type){
    case SET_USER:
      const {id, role} = action.payload
      return Object.assign({}, state, {id, role, isAuth: true})
    default:
      return state
  }
}
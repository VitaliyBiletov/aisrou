import {SET_USER} from "../types/userTypes";

const initialState = {
  id:'',
  role: '',
  fullName:'',
  isAuth: false
}

export function UserReducer(state = initialState, action){
  switch (action.type){
    case SET_USER:
      const {id, role, fullName} = action.payload
      return Object.assign({}, state, {id, role, fullName, isAuth: true})
    default:
      return state
  }
}
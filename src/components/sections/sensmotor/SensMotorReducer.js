import {SET_ACTIVE_ITEM, SET_NEXT_ITEM, SET_VALUE_ITEM} from "../../../pages/diag/diagTypes";

const initialState = {
    'artic': {activeItem: 0, data: []},
    'phonemics': {activeItem: 0, data: []},
    'sounds': {activeItem: 0, data: []},
    'syllable': {activeItem: 0, data: []},
}

export function SensMotorReducer(state = initialState, action){
  switch (action.type){
    //Установка активного элемента при клике в статусной строке
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        [action.name]: {...state[action.name], activeItem: action.index}
      }
    /*Установка следующего элемента в активное состояние,
    если элемент последний то возвращаться к первому
    */
    case SET_NEXT_ITEM:
      const { count } = action
      const nextItem = state[action.name].activeItem + 1
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          activeItem: nextItem < count ? nextItem : 0
        }
      }
    /*Устанавливает id и значение в массив data, в случае, если есть
    уже такой id перезаписывает значение
    */
    case SET_VALUE_ITEM:
      const s = state[action.name]
      return {
        ...state,
        [action.name]: {
          ...s,
          data: s.data.find(i=> i.id === action.id) ?
            s.data.map(i=>{
              if (i.id === action.id){
                return {id:action.id, value: action.value}
              }
              return i
            }):
            [...s.data, {id:action.id, value: action.value}]
        }
      }

    default: return state
  }
}
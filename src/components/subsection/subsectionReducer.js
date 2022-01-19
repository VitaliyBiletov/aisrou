import {SET_VALUE_ITEM} from "./subsectionTypes";

const initialState = {
    "sensMotor":{
      "artic":[],
      "phonemics":[],
      "sounds":[],
      "syllable":[],
    },
    "grammatic":{
      "pluralNominative":[],
      "pluralGenitive":[],
      "diminutiveForm":[],
      "prepositions":[],
      "relativeAdjectives":[],
      "possessiveAdjectives":[],
      "qualityAdjectives":[],
      "draftingProposals":[],
      "proposalVerification":[]
    }
}

export function SubsectionReducer(state = initialState, action){
  switch (action.type){
    case SET_VALUE_ITEM:
      return updateItems(state, action)
    default: return state
  }
}

function updateItems(state, action) {
    const {name, section, id, value} = action.payload
    if(!!state[section][name].find(i=>i.id===id)){
      const copySection = Object.assign({}, state[section])
      copySection[name] = copySection[name].map(i=>i.id === id ? {id: id, value: value} : i)
      return Object.assign({}, state, {[section]: copySection})
    } else {
      const copySection = Object.assign({}, state[section])
      copySection[name] = [...copySection[name], ({id:id, value: value})]
      return Object.assign({}, state, {[section]: copySection})
  }
}
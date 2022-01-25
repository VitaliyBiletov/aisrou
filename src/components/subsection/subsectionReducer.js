import {SET_VALUE_ITEM, SET_VALUE_STATE_FUNC} from "./subsectionTypes";

const initialState = {
    "stateOfFunc":{
      "hearing":'',
      "vision":'',
      "breath":'',
      "voice":'',
      "prosody":'',
      "articulationApparatus":'',
      "motorSkills":'',
      "additionalInformation":''
    },
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
    },
    "lexis":{
      "generalizing":[],
      "antonyms":[],
      "actions":[],
      "concrete":[]
    }
}

export function SubsectionReducer(state = initialState, action){
  switch (action.type){
    case SET_VALUE_ITEM:
      return updateItems(state, action)
    case SET_VALUE_STATE_FUNC:
      return Object.assign({}, state, {stateOfFunc:{...state.stateOfFunc, [action.payload.name]:action.payload.value}})
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
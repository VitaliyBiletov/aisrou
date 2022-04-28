import {
  SET_VALUE_ITEM,
  SET_VALUE_STATE_FUNC,
  SET_SPEED_READING,
  SET_SKILL,
  RESET_SKILLS,
  STATE_LOADING,
  RESET_TASKS
} from "../types/tasksTypes";

const initialState = {
  "stateOfFunc": {
    "hearing": '',
    "vision": '',
    "breath": '',
    "voice": '',
    "prosody": '',
    "articulationApparatus": '',
    "motorSkills": '',
    "additionalInformation": ''
  },
  "sensMotor": {
    "artic": emptyTemplate(8),
    "phonemics": emptyTemplate(13),
    "sounds": emptyTemplate(42),
    "syllable": emptyTemplate(9),
  },
  "grammatic": {
    "pluralNominative": emptyTemplate(4),
    "pluralGenitive": emptyTemplate(4),
    "diminutiveForm": emptyTemplate(5),
    "prepositions": emptyTemplate(6),
    "relativeAdjectives": emptyTemplate(6),
    "possessiveAdjectives": emptyTemplate(5),
    "qualityAdjectives": emptyTemplate(5),
    "draftingProposals": emptyTemplate(6),
    "proposalVerification": emptyTemplate(6)
  },
  "lexis": {
    "generalizing": emptyTemplate(8),
    "antonyms": emptyTemplate(6),
    "actions": emptyTemplate(6),
    "concrete": emptyTemplate(8)
  },
  "coherentSpeech": {
    "paraphrase": emptyTemplate(1),
    "story": emptyTemplate(1)
  },
  "langAnalysis": {
    "compositionProposal": emptyTemplate(2),
    "syllabicAnalysis": emptyTemplate(2),
    "syllabicSynthesis": emptyTemplate(2),
    "soundExtraction": emptyTemplate(2),
    "soundNumber": emptyTemplate(3),
    "phonemicSynthesis": emptyTemplate(2)
  },
  "reading": {
    "speed": 0,
    "skills": {
      "readingMethod":{
        "letterByLetter": false,
        "bySyllables": false,
        "slowlyInSyllables": false,
        "wholeWords": false
      },
      "right":{
        "passesSounds": false,
        "passesSyllables": false,
        "permutationsSounds": false,
        "permutationsSyllables": false,
        "replaceGSSounds": false,
        "replaceFSSounds": false,
        "substitutionsSyllables": false,
        "substitutionsWords": false,
        "additionsSounds": false,
        "additionsSyllables": false,
        "replaysSounds": false,
        "replaysSyllables": false,
        "replaysWords": false,
        "wrongEmphasis": false,
        "aggrammRading": false,
        "persistentErrors": false,
        "noErrorsRight": false
      },
      "expressiveness":{
        "pausesOnPunctuationMarks": false,
        "raiseAndLowerVoice": false,
        "emphasizingImportantWords": false,
        "intonedReading": false,
      },
      "mindfulness":{
        "literalSense": false,
        "figurativeMeaning": false,
        "storyEventChains": false,
        "mainIdea": false,
        "factualData": false,
        "understanding": false,
      }
    }
  },
  "writing": {
    "skills": {
      "pronunciationOfSounds":{
        "substitutions": false,
        "confusion": false,
        "letterGaps": false,
      },
      "undisturbedPronunciation":{
        "letterSubstitutions": false,
        "softnessDesignationErrors": false,
      },
      "violationForms":{
        "passes": false,
        "permutations": false,
        "addingLetters": false,
        "addingSyllables": false,
        "consolidatedSpelling": false,
        "separateSpelling": false,
        "missingMark": false,
      },
      "underdevelopmentGrammatical":{
        "morphologicalDisorders": false,
        "syntaxViolations": false,
        "textLevel": false,
      },
      "visuospatialFunctions":{
        "mirrorSpelling": false,
        "addingLetterElements": false,
        "diffNumElements": false,
        "sameNumElements": false
      }
    }
  }
}

export function TasksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE_ITEM:
      return updateItems(state, action)
    case SET_VALUE_STATE_FUNC:
      return Object.assign({}, state, {
        stateOfFunc: {
          ...state.stateOfFunc,
          [action.payload.name]: action.payload.value
        }
      })
    case SET_SPEED_READING:
      return Object.assign({}, state, {reading: {...state.reading, speed: action.payload}})
    case SET_SKILL:
      const {type, name, taskName, value} = action.payload
      return Object.assign(
        {},
        state,
        {[type]: {...state[type],
            skills: {...state[type].skills,
              [taskName]:{...state[type].skills[taskName], [name]:value}}
          }})
    case STATE_LOADING:
      return Object.assign({}, state, {...action.payload.data})
    case RESET_SKILLS:
      const tmp = {}
      const obj = Object.assign({},state[action.payload.type].skills[action.payload.taskName])
      const skills = Object.keys(obj).map(skill=>{
        if (skill === action.payload.name){
          Object.assign(tmp, {[skill]: action.payload.value})
          return {[skill]: action.payload.value}
        }
        Object.assign(tmp, {[skill]: false})
        return {[skill]: false}
      })
      return Object.assign(
        {},
        state,
        {[action.payload.type]: {...state[action.payload.type], skills: {...state[action.payload.type].skills,
              [action.payload.taskName]: tmp  }}})
    case RESET_TASKS:
      return Object.assign({}, initialState)
    default:
      return state
  }
}

function updateItems(state, action) {
  const {name, section, id, value} = action.payload
  if (!!state[section][name].find(i => i.id === id)) {
    const copySection = Object.assign({}, state[section])
    copySection[name] = copySection[name].map(i => i.id === id ? {id: id, value: value} : i)
    return Object.assign({}, state, {[section]: copySection})
  } else {
    const copySection = Object.assign({}, state[section])
    copySection[name] = [...copySection[name], ({id: id, value: value})]
    return Object.assign({}, state, {[section]: copySection})
  }
}

function emptyTemplate(num) {
  let arr = []
  for (let i=0; i < num; i++){
    arr.push({id: i, value: null})
  }
  return arr
}
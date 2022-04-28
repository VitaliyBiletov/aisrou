import {
  SET_VALUE_ITEM,
  SET_VALUE_STATE_FUNC,
  SET_SPEED_READING,
  SET_SKILL,
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
      "letterByLetter": false,
      "bySyllables": false,
      "slowlyInSyllables": false,
      "wholeWords": false,
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
      "pausesOnPunctuationMarks": false,
      "raiseAndLowerVoice": false,
      "emphasizingImportantWords": false,
      "literalSense": false,
      "figurativeMeaning": false,
      "storyEventChains": false,
      "mainIdea": false,
      "factualData": false,
      "noErrorsRight": false,
      "intonedReading": false,
      "persistentErrors": false,
      "understanding": false,

    }
  },
  "writing": {
    "skills": {
      "substitutions": false,
      "confusion": false,
      "letterGaps": false,
      "letterSubstitutions": false,
      "softnessDesignationErrors": false,
      "passes": false,
      "permutations": false,
      "addingLetters": false,
      "addingSyllables": false,
      "consolidatedSpelling": false,
      "separateSpelling": false,
      "missingMark": false,
      "morphologicalDisorders": false,
      "syntaxViolations": false,
      "textLevel": false,
      "mirrorSpelling": false,
      "addingLetterElements": false,
      "diffNumElements": false,
      "sameNumElements": false
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
      return Object.assign({}, state, {
        [action.payload.type]: {
          ...state[action.payload.type],
          skills: {
            ...state[action.payload.type].skills,
            [action.payload.name]: action.payload.value
          }
          }
      })
    case STATE_LOADING:
      return Object.assign({}, state, {...action.payload.data})
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
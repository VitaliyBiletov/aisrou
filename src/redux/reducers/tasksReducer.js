import {
  SET_VALUE_ITEM,
  SET_VALUE_STATE_FUNC,
  SET_SPEED_READING,
  SET_SKILL,
  STATE_LOADING
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
    "artic": [],
    "phonemics": [],
    "sounds": [],
    "syllable": [],
  },
  "grammatic": {
    "pluralNominative": [],
    "pluralGenitive": [],
    "diminutiveForm": [],
    "prepositions": [],
    "relativeAdjectives": [],
    "possessiveAdjectives": [],
    "qualityAdjectives": [],
    "draftingProposals": [],
    "proposalVerification": []
  },
  "lexis": {
    "generalizing": [],
    "antonyms": [],
    "actions": [],
    "concrete": []
  },
  "coherentSpeech": {
    "paraphrase": [],
    "story": []
  },
  "langAnalysis": {
    "compositionProposal": [],
    "syllabicAnalysis": [],
    "syllabicSynthesis": [],
    "soundExtraction": [],
    "soundNumber": [],
    "phonemicSynthesis": []
  },
  "reading": {
    "speed": 0,
    "skills": {
      "letterByLetter": false,
      "bySyllables": false,
      "slowlyInSyllables": false,
      "wholeWords": false,
      "phrases": false,
      "passes": false,
      "permutations": false,
      "substitutions": false,
      "additions": false,
      "replays": false,
      "sounds": false,
      "syllables": false,
      "words": false,
      "wrongEmphasis": false,
      "pausesOnPunctuationMarks": false,
      "raiseAndLowerVoice": false,
      "emphasizingImportantWords": false,
      "literalSense": false,
      "figurativeMeaning": false,
      "storyEventChains": false,
      "mainIdea": false,
      "factualData": false
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
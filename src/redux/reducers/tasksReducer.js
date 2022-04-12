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
    "skills": [
      {
        name: "letterByLetter",
        value: false
      },
      {
        name: "bySyllables",
        value: false
      },
      {
        name: "slowlyInSyllables",
        value: false
      },
      {
        name: "wholeWords",
        value: false
      },
      {
        name: "phrases",
        value: false
      },
      {
        name: "passes",
        value: false
      },
      {
        name: "permutations",
        value: false
      },
      {
        name: "substitutions",
        value: false
      },
      {
        name: "additions",
        value: false
      },
      {
        name: "replays",
        value: false
      },
      {
        name: "sounds",
        value: false
      },
      {
        name: "syllables",
        value: false
      },
      {
        name: "words",
        value: false
      },
      {
        name: "wrongEmphasis",
        value: false
      },
      {
        name: "pausesOnPunctuationMarks",
        value: false
      },
      {
        name: "raiseAndLowerVoice",
        value: false
      },
      {
        name: "emphasizingImportantWords",
        value: false
      },
      {
        name: "literalSense",
        value: false
      },
      {
        name: "figurativeMeaning",
        value: false
      },
      {
        name: "storyEventChains",
        value: false
      },
      {
        name: "mainIdea",
        value: false
      },
      {
        name: "factualData",
        value: false
      }
    ]
  },
  "writing": {
    "skills": [
      {
        name: "substitutions",
        value: false
      },
      {
        name: "confusion",
        value: false
      },
      {
        name: "letterGaps",
        value: false
      },
      {
        name: "letterSubstitutions",
        value: false
      },
      {
        name: "softnessDesignationErrors",
        value: false
      },
      {
        name: "passes",
        value: false
      },
      {
        name: "permutations",
        value: false
      },
      {
        name: "addingLetters",
        value: false
      },
      {
        name: "addingSyllables",
        value: false
      },
      {
        name: "consolidatedSpelling",
        value: false
      },
      {
        name: "separateSpelling",
        value: false
      },
      {
        name: "missingMark",
        value: false
      },
      {
        name: "morphologicalDisorders",
        value: false
      },
      {
        name: "syntaxViolations",
        value: false
      },
      {
        name: "textLevel",
        value: false
      },
      {
        name: "mirrorSpelling",
        value: false
      },
      {
        name: "addingLetterElements",
        value: false
      },
      {
        name: "diffNumElements",
        value: false
      },
      {
        name: "sameNumElements",
        value: false
      }
    ]
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
          skills: state[action.payload.type].skills.map(item => {
            if (action.payload.name === item.name) {
              return {name: action.payload.name, value: action.payload.value}
            }
            return item
          })
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
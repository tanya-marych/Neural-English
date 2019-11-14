import { ADD_WORD, SAVE_LEARNED_WORDS, DELETE_WORD, EDIT_WORD, SET_CURRENT_LANGUAGE, ADD_LANGUAGE, DELETE_LANGUAGE } from "../actionTypes";
import { LANGUAGE_TYPES } from "../constants";

const initialState = {
  language: null,
  allLanguages: [],
  [LANGUAGE_TYPES.en]: {
    byIds: [],
    allIds: [],
  },
  [LANGUAGE_TYPES.es]: {
    byIds: [],
    allIds: [],
  },
  [LANGUAGE_TYPES.fr]: {
    byIds: [],
    allIds: [],
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_WORD: {
      const { url, source, translation } = action.payload;

      const languageType = state.language;
      const words = state[languageType];

      const id = new Date().getMilliseconds();

      return {
        ...state,
        [languageType] : {
          allIds: [...words.allIds, id],
          byIds: {
            ...words.byIds,
            [id]: {
              url,
              source,
              translation,
              study: {
                amount: 0,
                correct: 0,
              },
            }
          }
        },
      };
    }
    case SAVE_LEARNED_WORDS: {
      const { learnedWords } = action.payload;

      const newState = Object.assign({}, state);
      const words = newState[newState.language];

      learnedWords.map(({ id, isCorrect }) => {
        const wordById = words.byIds[id];

        wordById.study.amount = wordById.study.amount + 1;
        if (isCorrect) {
          wordById.study.correct = wordById.study.correct + 1;
        }

        return wordById;
      });

      return newState;
    }
    case DELETE_WORD: {
      const newState = Object.assign({}, state);
      const words = newState[newState.language];

      const { id } = action.payload;

      words.allIds = words.allIds.filter(wordId => wordId !== id);
      delete words.byIds[id];

      return newState;
    }

    case EDIT_WORD: {
      const newState = Object.assign({}, state);
      const words = newState[newState.language];

      const { id, source, translation } = action.payload;

      words.byIds[id] = {
        ...words.byIds[id],
        source,
        translation,
      };

      return newState;
    }

    case SET_CURRENT_LANGUAGE: {
      const { language } = action.payload;
      const newState = Object.assign({}, state);
      newState.language = language;

      return newState;
    }
    case ADD_LANGUAGE: {
      const { language } = action.payload;
      console.warn('ka', language);
      const newState = Object.assign({}, state);
      newState.allLanguages = [...state.allLanguages, language];
      newState.language = language;

      console.warn('new', newState);

      return newState;
    }
    case DELETE_LANGUAGE: {
      const { language } = action.payload;
      const newState = Object.assign({}, state);
      newState.allLanguages = state.allLanguages.filter(lan => lan !== language);

      return newState;
    }
    default:
      return state;
  }
}

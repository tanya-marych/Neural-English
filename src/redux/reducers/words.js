import { ADD_WORD, SAVE_LEARNED_WORDS } from "../actionTypes";
import { LANGUAGE_TYPES } from "../constants";

const initialState = {
  language: LANGUAGE_TYPES.en,
  [LANGUAGE_TYPES.en]: {
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
    default:
      return state;
  }
}

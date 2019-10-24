import { ADD_WORD } from "../actionTypes";

const initialState = {
  language: 'en',
  byIds: [],
  allIds: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_WORD: {
      const { url, source, translation } = action.payload;
      const id = new Date().getMilliseconds();

      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            url,
            source,
            translation,
          }
        }
      };
    }
    default:
      return state;
  }
}

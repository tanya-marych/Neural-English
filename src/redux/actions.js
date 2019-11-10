import {
  ADD_WORD,
  DELETE_WORD,
  EDIT_WORD,
  SAVE_LEARNED_WORDS,
} from './actionTypes';

export const addWord = payload => ({
  type: ADD_WORD,
  payload,
});

export const sendLearnedWords = payload => ({
  type: SAVE_LEARNED_WORDS,
  payload,
});

export const deleteWord = payload => ({
  payload,
  type: DELETE_WORD,
});

export const editWord = payload => ({
  payload,
  type: EDIT_WORD,
});

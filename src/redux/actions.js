import { ADD_WORD, SAVE_LEARNED_WORDS } from './actionTypes';

export const addWord = payload => ({
  type: ADD_WORD,
  payload,
});

export const sendLearnedWords = payload => ({
  type: SAVE_LEARNED_WORDS,
  payload,
});

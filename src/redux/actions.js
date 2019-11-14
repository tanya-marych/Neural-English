import {
  ADD_WORD,
  DELETE_WORD,
  EDIT_WORD,
  SAVE_LEARNED_WORDS,
  SET_CURRENT_LANGUAGE,
  ADD_LANGUAGE,
  DELETE_LANGUAGE,
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

export const setCurrentLanguage = payload => ({
  payload,
  type: SET_CURRENT_LANGUAGE,
});

export const addLanguage = payload => ({
  payload,
  type: ADD_LANGUAGE,
});

export const deleteLanguage = payload => ({
  payload,
  type: DELETE_LANGUAGE,
});

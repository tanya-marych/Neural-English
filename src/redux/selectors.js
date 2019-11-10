import { createSelector } from 'reselect';

import { shuffle } from '../helpers/storeHelper';

export const getWordsStore = state => state.words;
export const getCurrentLang = state => state.words.language;

export const getWordsByCurrentLang = createSelector(
  [getWordsStore, getCurrentLang],
  (words, lang) => words[lang],
);

export const getWordsAllIdsList = createSelector(
  [getWordsStore, getCurrentLang],
  (words, lang) => words[lang].allIds,
);
  
export const getWordById = createSelector(
  [getWordsStore, getCurrentLang, (state, id) => id],
  (words, lang, id) => words[lang].byIds
    ? { ...words[lang].byIds[id], id }
    : {},
);

export const getWords = createSelector(
  [getWordsStore, getCurrentLang, state => state],
  (words, lang, state) => words[lang].allIds.map(id => getWordById(state, id)),
);

export const getRandomTranslations = createSelector(
  [getWords, (state, currentWord) => currentWord],
  (words, currentWord) => {
    const translations = shuffle(words)
      .slice(0, 5)
      .filter(word => word.id !== currentWord.id)
      .concat(currentWord)
      .filter(word => ({
        id: word.id,
        translation: word.translation,
      }))
      .slice(0, 5);

    return translations;
  }
);

export const getWordsInProgress = createSelector(
  [getWords, state => state],
  (words, state) => {
    const progressWords = shuffle(words.filter(word => word.study.amount < 10))
      .slice(0, 10)
      .map(word => {
        word.selectFrom = getRandomTranslations(state, word);
  
        return word;
      });

      return progressWords;

    // words with progress less 0.5
    // const newWords = progressWords.filter(word => word.progress < 0.5).slice(5);
    // const learnedWords = progressWords.filter(word => word.progress >= 0.5).slice(5);

    // console.warn('123', newWords.concat(learnedWords));

    // return newWords.concat(learnedWords).map(word => {
    //   word.selectFrom = getRandomTranslations(word);

    //   return word;
    // });
  }
);

export const getWordsAllIdsList = store =>
  store && store.words ? store.words.allIds : [];

export const getWordById = (store, id) => store && store.words && store.words.byIds
  ? { ...store.words.byIds[id], id }
  : {};

export const getWords = store =>
  getWordsAllIdsList(store).map(id => getWordById(store, id));

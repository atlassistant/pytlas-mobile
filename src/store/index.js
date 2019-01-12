import { createStore as create, applyMiddleware, combineReducers } from 'redux';
import { persistStore as persistStoreRaw, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { name } from '../../app.json';
import auth from './auth';
import assistant from './assistant';

// eslint-disable-next-line max-len
const persistStore = storeToPersist => new Promise(resolve => persistStoreRaw(storeToPersist, null, resolve));

export default async function createStore() {
  const persistedConfig = {
    key: 'root',
    storage,
  };

  const securePersistedConfig = {
    key: 'secured',
    storage: createSensitiveStorage({
      keychainService: name,
      sharedPreferencesName: name,
    }),
  };

  const store = create(combineReducers({
    auth: persistReducer(securePersistedConfig, auth),
    assistant: persistReducer(persistedConfig, assistant),
  }), applyMiddleware(thunk));

  await persistStore(store);

  return store;
}

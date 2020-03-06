import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import app from './app/appReducer';
import events from './events/eventsReducer';
import token from './token/tokenReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  blackList: ['events'],
};

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
  encrypt: true,
});

const tokenPersistConfig = {
  key: 'token',
  storage: sensitiveStorage,
};

const rootReducer = combineReducers({
  app: persistReducer(persistConfig, app),
  token: persistReducer(tokenPersistConfig, token),
  events,
});

export default rootReducer;

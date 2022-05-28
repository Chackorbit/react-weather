import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import countrySlice from './country-slice';
import { weatherFetch } from './fetch-weather';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  weatherFetch.middleware,
];

const authPersistConfig = {
  key: 'countries',
  storage,
  whitelist: ['countries'],
};

// Создание стора

export const store = configureStore({
  reducer: {
    country: persistReducer(authPersistConfig, countrySlice),
    [weatherFetch.reducerPath]: weatherFetch.reducer,
  },
  middleware,
});

export const persistor = persistStore(store);

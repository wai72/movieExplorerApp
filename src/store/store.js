// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../api/tmdbApi';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites', 'auth'], // Persist favorites and auth slices
};

const rootReducer = combineReducers({
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  favorites: favoritesReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }).concat(tmdbApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../api/tmdbApi';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

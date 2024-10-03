// src/api/tmdbApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { TMDB_API_KEY } from '@env'; // Use react-native-dotenv or similar to manage environment variables
const TMDB_API_KEY = '6448e166ad88f4932a991d483da25a4a';
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
   // Update in src/api/tmdbApi.js
getUpcomingMovies: builder.query({
    query: (page = 1) => `movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
  }),
  getPopularMovies: builder.query({
    query: (page = 1) => `movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
  }),
    getMovieDetails: builder.query({
      query: (movieId) => `movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`,
    }),
    // Add more endpoints as needed (e.g., pagination)
  }),
});

export const {
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;

// src/screens/PopularMoviesScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGetPopularMoviesQuery } from '../../api/tmdbApi';
import MovieCard from '../../components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '../../store/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appDimension, appFontSize } from '../../utils/constants';
import useLoadFavorites from '../../hooks/useLoadFavorites';

const PopularMoviesScreen = () => {
  useLoadFavorites();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [page, setPage] = useState(1); // Current page
  const [movies, setMovies] = useState([]); // Accumulated list of movies
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Loading more indicator
  const {
    data: popularData,
    error: popularError,
    isLoading: popularLoading,
    refetch: refetchPopular,
  } = useGetPopularMoviesQuery();

  useEffect(() => {
    // Load favorites from AsyncStorage on mount
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        dispatch(setFavorites(JSON.parse(storedFavorites)));
      }
    };
    loadFavorites();
  }, [dispatch]);

  useEffect(() => {
    if (popularData) {
      if (page === 1) {
        // Initial fetch
        setMovies(popularData.results);
      } else {
        // Append new movies
        setMovies((prevMovies) => [...prevMovies, ...popularData.results]);
      }
      setIsFetchingMore(false); // Reset fetching more state
    }
  }, [popularData, page]);

  const handleLoadMore = () => {
    if (!po && popularData && page < popularData.total_pages) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderContent = () => {
    if (popularLoading && page === 1) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
    }

    if (popularError && page === 1) {
      return (
        <View style={styles.center}>
          <Text>Error fetching popular movies.</Text>
          <TouchableOpacity onPress={refetchPopular}>
            <Text style={styles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (movies.length === 0 && !popularLoading) {
      return (
        <View style={styles.center}>
          <Text>No Popular Movies Found.</Text>
        </View>
      );
    }

    return (
      <FlatList
        style={styles.listStyle}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // Optional: Improve performance by providing extra props
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
      />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 70},
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retry: { color: 'blue', marginTop: appDimension.normal_padding },
  listStyle: { margin: 4, backgroundColor: '#eeeeee' },
});

export default PopularMoviesScreen;

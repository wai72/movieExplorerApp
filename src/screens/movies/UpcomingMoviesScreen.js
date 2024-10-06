// src/screens/UpcomingMoviesScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGetUpcomingMoviesQuery } from '../../api/tmdbApi';
import MovieCard from '../../components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { appDimension, appFontSize } from '../../utils/constants';
import useLoadFavorites from '../../hooks/useLoadFavorites';

const UpcomingMoviesScreen = () => {
  useLoadFavorites(); // Custom hook to load favorites from AsyncStorage
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const [page, setPage] = useState(1); // Current page
  const [movies, setMovies] = useState([]); // Accumulated list of movies
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Loading more indicator

  const {
    data: upcomingData,
    error: upcomingError,
    isLoading: upcomingLoading,
    isFetching: upcomingIsFetching,
    refetch: refetchUpcoming,
  } = useGetUpcomingMoviesQuery(page, {
  });

  useEffect(() => {
    if (upcomingData) {
      if (page === 1) {
        // Initial fetch
        setMovies(upcomingData.results);
      } else {
        // Append new movies
        setMovies((prevMovies) => [...prevMovies, ...upcomingData.results]);
      }
      setIsFetchingMore(false); // Reset fetching more state
    }
  }, [upcomingData, page]);

  const handleLoadMore = () => {
    if (!upcomingIsFetching && upcomingData && page < upcomingData.total_pages) {
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
    if (upcomingLoading && page === 1) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
    }

    if (upcomingError && page === 1) {
      return (
        <View style={styles.center}>
          <Text>Error fetching upcoming movies.</Text>
          <TouchableOpacity onPress={refetchUpcoming}>
            <Text style={styles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (movies.length === 0 && !upcomingLoading) {
      return (
        <View style={styles.center}>
          <Text>No Upcoming Movies Found.</Text>
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
  container: { flex: 1, marginTop: 70 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retry: { color: 'blue', marginTop: appDimension.normal_padding },
  listStyle: { margin: 4, backgroundColor: '#eeeeee' },
  footer: {
    paddingVertical: 20,
  },
});

export default UpcomingMoviesScreen;

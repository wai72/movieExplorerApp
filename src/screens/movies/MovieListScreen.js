// src/screens/MovieListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGetUpcomingMoviesQuery, useGetPopularMoviesQuery } from '../../api/tmdbApi';
import MovieCard from '../../components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '../../store/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appDimension, appFontSize } from '../../utils/constants';

const MovieListScreen = () => {
  const [category, setCategory] = useState('Upcoming');
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const {
    data: upcomingData,
    error: upcomingError,
    isLoading: upcomingLoading,
    refetch: refetchUpcoming,
  } = useGetUpcomingMoviesQuery();

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

  const toggleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const renderContent = () => {
    const isLoading = category === 'Upcoming' ? upcomingLoading : popularLoading;
    const error = category === 'Upcoming' ? upcomingError : popularError;
    const data = category === 'Upcoming' ? upcomingData : popularData;

    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text>Error fetching movies.</Text>
          <TouchableOpacity onPress={category === 'Upcoming' ? refetchUpcoming : refetchPopular}>
            <Text style={styles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (data && data.results.length === 0) {
      return (
        <View style={styles.center}>
          <Text>No Movies Found.</Text>
        </View>
      );
    }

    return (
      <FlatList
        style={styles.listStyle}
        data={data.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={() => {
          // Handle pagination or lazy loading here
        }}
        onEndReachedThreshold={0.5}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, category === 'Upcoming' && styles.activeButton]}
          onPress={() => toggleCategory('Upcoming')}
        >
          <Text style={styles.navText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, category === 'Popular' && styles.activeButton]}
          onPress={() => toggleCategory('Popular')}
        >
          <Text style={styles.navText}>Popular</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', padding: appDimension.small_padding },
  navButton: { padding: appDimension.small_padding },
  activeButton: { borderBottomWidth: 2, borderBottomColor: 'blue' },
  navText: { fontSize: appFontSize.large_fontSize },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retry: { color: 'blue', marginTop: appDimension.normal_padding },
  listStyle: {margin: 4, backgroundColor: '#eeeeee'}
});

export default MovieListScreen;

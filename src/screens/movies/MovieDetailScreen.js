// src/screens/MovieDetailsScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetMovieDetailsQuery } from '../../api/tmdbApi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { appDimension } from '../../utils/constants';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route?.params;
  const { data, error, isLoading, refetch } = useGetMovieDetailsQuery(movieId);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movieId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(data));
    } else {
      dispatch(addFavorite(data));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error fetching movie details.</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>Release Date: {data.release_date}</Text>
        <Text style={styles.synopsis}>{data.overview}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        <Text>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back to List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  poster: { width: appDimension.poster_detail_image_width, height: appDimension.poster_detail_image_height, borderRadius: appDimension.large_borderradius },
  info: { marginTop: 20, width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold' },
  synopsis: { marginTop: 10, fontSize: 16 },
  favoriteButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  backButton: { marginTop: 20 },
  backText: { color: 'blue', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retry: { color: 'blue', marginTop: 10 },
});

export default MovieDetailsScreen;

// src/components/MovieCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { appDimension, appFontSize } from '../utils/constants';

const MovieCard = ({ movie }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })}
      testID="heart-icon"
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>Release Date: {movie.release_date}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.icon}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: appDimension.normal_padding, alignItems: 'center',backgroundColor: "#fff", margin: 5, borderRadius: appDimension.normal_borderradius },
  poster: { width: appDimension.image_width, height: appDimension.image_height, borderRadius: appDimension.normal_borderradius },
  info: { flex: 1, marginLeft: appDimension.normal_padding , alignSelf: 'flex-start'},
  title: { fontSize: appFontSize.large_fontSize, fontWeight: 'bold', paddingBottom: appDimension.xsmall_padding },
  icon: { padding: appDimension.small_padding },
});

export default MovieCard;

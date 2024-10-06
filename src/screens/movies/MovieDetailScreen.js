// src/screens/MovieDetailsScreen.js
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useGetMovieDetailsQuery} from '../../api/tmdbApi';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../../store/slices/favoritesSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import {appDimension, appFontSize} from '../../utils/constants';

const MovieDetailsScreen = ({route, navigation}) => {
  const {movieId} = route?.params;
  const {data, error, isLoading, refetch} = useGetMovieDetailsQuery(movieId);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(fav => fav.id === movieId);

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
        source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>Release Date: {data.release_date}</Text>
        <Text style={styles.synopsis}>{data.overview}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
        <Text style={styles.text}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backText}>Back to List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', padding: appDimension.large_padding},
  poster: {
    width: appDimension.poster_detail_image_width,
    height: appDimension.poster_detail_image_height,
    borderRadius: appDimension.large_borderradius,
  },
  info: {marginTop: appDimension.large_padding, width: '100%'},
  title: {fontSize: appFontSize.xlarge_fontSize, fontWeight: 'bold'},
  synopsis: {marginTop: appDimension.large_borderradius, fontSize: appFontSize.large_fontSize},
  favoriteButton: {flexDirection: 'row', alignItems: 'center', marginTop: appDimension.large_padding},
  backButton: {marginTop: appDimension.large_padding},
  backText: {color: 'blue', fontSize: appFontSize.large_fontSize},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  retry: {color: 'blue', marginTop: appDimension.large_borderradius},
  text: {marginLeft: appFontSize.large_fontSize, fontStyle: 'italic', textDecorationLine: 'underline'},
});

export default MovieDetailsScreen;

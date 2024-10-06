import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFavorites } from '../store/slices/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLoadFavorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        dispatch(setFavorites(JSON.parse(storedFavorites)));
      }
    };
    loadFavorites();
  }, [dispatch]);
};

export default useLoadFavorites;


import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from '../MovieCard';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { NavigationContainer } from '@react-navigation/native';

const movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  release_date: '2024-01-01',
};

describe('MovieCard', () => {
  it('renders movie details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <MovieCard movie={movie} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('Release Date: 2024-01-01')).toBeTruthy();
  });

  it('toggles favorite status on heart icon press', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <MovieCard movie={movie} />
        </NavigationContainer>
      </Provider>
    );

    const heartIcon = getByTestId('heart-icon');
    fireEvent.press(heartIcon);

    // Add assertions based on the favorite state
  });
});

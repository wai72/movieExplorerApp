// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import MovieDetailsScreen from '../screens/movies/MovieDetailScreen';
import BottomTabNavigator from './BottomTabNavigator';

import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {!user ? (
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : ( */}
          <>
            <Stack.Screen
              name="Main"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetails"
              component={MovieDetailsScreen}
              options={{ title: 'Movie Details' }}
            />
          </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

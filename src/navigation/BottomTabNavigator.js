// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopularMoviesScreen from '../screens/movies/PopularMoviesScreen';
import UpcomingMoviesScreen from '../screens/movies/UpcomingMoviesScreen';
import { Ionicons } from 'react-native-vector-icons/Ionicons'; 
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Popular') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Upcoming') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          // Return any component that you like here!
          return <TabBarIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Popular" component={PopularMoviesScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingMoviesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

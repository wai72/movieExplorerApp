import React from 'react';
import Icon  from 'react-native-vector-icons/Ionicons'; 

const TabBarIcon = ({ name, color, size }) => {
  return <Icon name={name} size={size} color={color} />;
};

export default TabBarIcon;
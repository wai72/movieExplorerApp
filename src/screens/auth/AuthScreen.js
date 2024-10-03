// src/screens/AuthScreen.js
import React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

const AuthScreen = () => {
  const dispatch = useDispatch();

  const signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Fetch user data from Facebook API if needed
      // For simplicity, we'll just set a dummy user
      dispatch(setUser({ name: 'Facebook User', email: 'fbuser@example.com' }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity title="Sign in with Facebook" onPress={signInWithFacebook} />
      {/* <Button title="Sign in with Facebook" onPress={signInWithFacebook} /> */}
    </View>
  );
};

export default AuthScreen;

// src/screens/AuthScreen.js
import React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const AuthScreen = () => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo.user));
    } catch (error) {
      console.error(error);
    }
  };

//   const signInWithFacebook = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//       if (result.isCancelled) {
//         throw 'User cancelled the login process';
//       }

//       const data = await AccessToken.getCurrentAccessToken();
//       if (!data) {
//         throw 'Something went wrong obtaining access token';
//       }

//       // Fetch user data from Facebook API if needed
//       // For simplicity, we'll just set a dummy user
//       dispatch(setUser({ name: 'Facebook User', email: 'fbuser@example.com' }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <View>
      <TouchableOpacity title="Sign in with Google" onPress={signInWithGoogle} />
      {/* <Button title="Sign in with Facebook" onPress={signInWithFacebook} /> */}
    </View>
  );
};

export default AuthScreen;

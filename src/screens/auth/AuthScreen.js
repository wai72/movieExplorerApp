// src/screens/AuthScreen.js
import React from 'react';
import { View, Button, TouchableOpacity, StyleSheet, Text } from 'react-native';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      dispatch(setUser({ name: 'Yin Wai Naing', email: 'shinehtetwailay55@gmail.com' }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Movie Explorer</Text>
      <View style={styles.iconContainer}>
      {/* <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              if (Platform.OS === "ios") {
                AuthenticationToken.getAuthenticationTokenIOS().then((data) => {
                  console.log(data?.authenticationToken);
                });
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  console.log(data?.accessToken.toString());
                });
              }
            }
          }}
          onLogoutFinished={() => console.log("logout.")}
          loginTrackingIOS="limited"
          nonceIOS="my_nonce" // Optional
        /> */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={signInWithFacebook}
          accessible={true}
          accessibilityLabel="Sign in with Facebook"
        >
          <Icon name="facebook" size={30} color="#3b5998" />
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default AuthScreen;

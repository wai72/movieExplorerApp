// src/utils/GoogleSignInConfig.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your actual client ID
  });
};


import React, { useEffect } from 'react';
import { View, Button, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk-next';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 
import { appColor, appDimension, appFontSize } from '../../utils/constants';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const user = useSelector((state) => state.auth.user);
    // Redirect if user is already logged in
    useEffect(() => {
      if (user) {
        navigation.replace('Main'); 
      }
    }, [user, navigation]);

    const signInWithGoogle = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        dispatch(setUser(userInfo.user));
      } catch (error) {
        console.error(error);
      }
    };

  const signInWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        navigation.replace('Main');
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

     dispatch(setUser({ name: 'Yin Wai Naing', email: 'grace.yinwainaing@gmail.com' }));
      // Redirect to MovieListScreen after login
      navigation.replace('Main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image 
        source={require('../../assets/logo_icon.png')}
        style={styles.logo} 
      />
      <Text style={styles.title}>Welcome to Movie Explorer</Text>
      <View style={styles.iconContainer}>
     
        <TouchableOpacity
          style={styles.iconButton}
          onPress={signInWithGoogle}
          accessible={true}
          accessibilityLabel="Sign in with google"
        >
          <Icon name="google" size={30} color="#FFC107" />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.iconContainer}>
     
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
    paddingHorizontal: appDimension.large_padding,
  },
  logo: {
    width: appDimension.logo_width,
    height: appDimension.logo_height,
    marginBottom: appDimension.small_button_height,
  },
  title: {
    fontSize: appFontSize.xlarge_fontSize,
    fontWeight: 'bold',
    marginBottom: appDimension.small_button_height,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingTop: appDimension.normal_padding
    //width: '80%',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: appDimension.normal_padding,
    borderRadius: appDimension.large_borderradius,
    marginHorizontal: appDimension.normal_padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    marginLeft: appDimension.large_borderradius,
    fontSize: appFontSize.large_fontSize,
    color: '#333',
  },
  orText: {
    margin: appDimension.large_borderradius,
    fontSize: appFontSize.large_fontSize,
    fontWeight: 'bold',
    color: appColor.accent_color,
  },
});

export default LoginScreen;

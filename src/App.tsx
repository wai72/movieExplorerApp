// src/App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
//import { configureGoogleSignIn } from './utils/GoogleSignInConfig';
import { configureFacebook } from './utils/FacebookConfig';

const App = () => {
  useEffect(() => {
    //configureGoogleSignIn();
    configureFacebook();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

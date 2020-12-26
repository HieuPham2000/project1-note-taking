import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, YellowBox, LogBox } from 'react-native';

import store from './redux/store';
import Navigator from './AppNavigation';
//import FirebaseProvider from './firebase'

/* export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <Navigator />
      </FirebaseProvider>
    </Provider>
  );
} */

export default function App() {
 LogBox.ignoreLogs(['Setting a timer']);
  return (
    <Provider store={store}>
        <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

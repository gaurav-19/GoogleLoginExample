/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import GoogleLogin from './src/components/GoogleLogin';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <GoogleLogin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;

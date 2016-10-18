/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
} from 'react-native';
import Login from './app/android/components/Login';

class MovieCircle extends Component {
  render() {
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        title='MovieCircle'
        titleColor='#ffffff'
        navIcon={require('image!ic_menu_black_24dp')}/>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#5e35b1',
    height: 56,
  },
});

AppRegistry.registerComponent('MovieCircle', () => MovieCircle);

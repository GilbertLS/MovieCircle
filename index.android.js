import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  UIManager,
} from 'react-native';

import { COLOR, ThemeProvider } from 'react-native-material-ui';

import {
  App,
  Modal,
} from './app/android/components';

import {
  MoviesPage,
  MoviePage,
  SearchPage,
} from './app/android/containers';

const uiTheme = {
    palette: {
        primaryColor: '#5e35b1',
        accentColor: '#ffc107'
    },
    toolbar: {
        container: {
            height: 56,
            elevation: 0,
        },
    },
};

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class MovieCircle extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <App/>
          <Modal>
            <SearchPage/>
          </Modal>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
});

AppRegistry.registerComponent('MovieCircle', () => MovieCircle);

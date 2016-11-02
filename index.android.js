import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import {
  App,
} from './app/android/components';

import {
  MoviesPage,
  MoviePage,
} from './app/android/containers';

class MovieCircle extends Component {
  render() {
    return (
      <Router>
        <Scene key="modal" component={Modal} >
          <Scene key='root' component={App}>
            <Scene key='movies' component={MoviesPage} title='Movies' initial={true} />
          </Scene>
          <Scene key='movie' component={MoviePage} title='Movie'/>
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('MovieCircle', () => MovieCircle);

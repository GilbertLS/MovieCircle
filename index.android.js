import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import RouterStore from './app/android/router/store';
import RouterActions from './app/android/router/actions';

import {
  AppRegistry,
  StyleSheet,
  View,
  UIManager,
  Modal,
  BackAndroid,
  StatusBar,
} from 'react-native';

import {
  App,
} from './app/android/components';

import {
  MoviesPage,
  MoviePage,
  SearchPage,
  AboutPage,
  FavoritesPage,
} from './app/android/containers';

//Store Actors
import FacebookStore from './app/stores/FacebookStore';
import FacebookActions from './app/actions/FacebookActions';
import FacebookActor from './app/actors/FacebookActor';

//Allow Layout Animations
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

//Set Theme For react-native-material-ui
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

class MovieCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: undefined,
      movie: undefined,
    }

    this.handleRouterStoreChange = this.handleRouterStoreChange.bind(this);
    this.handleBackAndroid       = this.handleBackAndroid.bind(this);
  }

  componentDidMount() {
    RouterStore.listen(this.handleRouterStoreChange);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);

    //Actor takes care of login/logout
    FacebookStore.listen(FacebookActor);
    FacebookActions.getLoginStatus();
  }

  componentWillUnmount() {
    RouterStore.unlisten(this.handleRouterStoreChange);
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);

    FacebookStore.unlisten(FacebookActor);
  }

  handleRouterStoreChange(store) {
    this.setState({
      modal: store.modal,
      movie: store.movies[store.movies.length-1],
    });
  }

  handleBackAndroid() {
    console.log('hello')
    return false;
  }

  render() {
    const modal = function(key) {
      switch(key) {
        case 'search':
          return <SearchPage/>;
          break;
        case 'about':
          return <AboutPage/>;
          break;
        case 'favorites':
          return <FavoritesPage/>;
          break;
      }
    }

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#4F2C94'/>
          <App/>
          {
            !!this.state.movie &&
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={true}
              onRequestClose={() => RouterActions.removeMovie()}
            >
              <MoviePage movieId={this.state.movie}/>
            </Modal>
          }
          {
            !!this.state.modal &&
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={true}
              onRequestClose={() => RouterActions.removeModal()}
            >
              { modal(this.state.modal) }
            </Modal>
          }
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
});

AppRegistry.registerComponent('MovieCircle', () => MovieCircle);

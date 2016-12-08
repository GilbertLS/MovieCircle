import React, { Component } from 'react';
import Snackbar from 'react-native-android-snackbar';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import RouterStore from './app/android/router/store';
import RouterActions from './app/android/router/actions';
import UserStore from './app/stores/UserStore';

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
      movies: [],
      isLoggedIn: UserStore.getIsLoggedIn(),
    }

    this.handleRouterStoreChange = this.handleRouterStoreChange.bind(this);
    this.handleUserStoreChange   = this.handleUserStoreChange.bind(this);
    this.handleBackAndroid       = this.handleBackAndroid.bind(this);
  }

  componentDidMount() {
    RouterStore.listen(this.handleRouterStoreChange);
    UserStore.listen(this.handleUserStoreChange);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);

    //Actor takes care of login/logout
    FacebookStore.listen(FacebookActor);
    FacebookActions.getLoginStatus();
  }

  componentWillUnmount() {
    RouterStore.unlisten(this.handleRouterStoreChange);
    UserStore.unlisten(this.handleUserStoreChange);
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);

    FacebookStore.unlisten(FacebookActor);
  }

  handleRouterStoreChange(store) {
    this.setState({
      modal: store.modal,
      movies: store.movies,
    });
  }

  handleUserStoreChange(store) {
    if(!UserStore.getIsLoggedIn() && !!this.state.isLoggedIn) {
      Snackbar.show('You Have Been Logged Out!', {
        duration: Snackbar.UNTIL_CLICK,
        actionColor: 'gold',
      });
    }

    this.setState({
      isLoggedIn: UserStore.getIsLoggedIn(),
    });
  }

  handleBackAndroid() {
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
          return <FavoritesPage initialTab={0}/>;
          break;
        case 'watched':
          return <FavoritesPage initialTab={1}/>;
          break;
        case 'watch_later':
          return <FavoritesPage initialTab={2}/>;
          break;
      }
    }

    const movie = this.state.movies[this.state.movies.length-1];

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#4F2C94'/>
          <App isLoggedIn={this.state.isLoggedIn}/>
          {
            !!movie &&
            <Modal
              key={movie.id}
              animationType={'none'}
              transparent={false}
              visible={true}
              onRequestClose={() => RouterActions.removeMovie()}
            >
              <MoviePage
                movie={movie}
                isLoggedIn={this.state.isLoggedIn}
              />
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

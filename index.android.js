import React, { Component } from 'react';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import RouterStore from './app/android/router/store';

import {
  AppRegistry,
  StyleSheet,
  View,
  UIManager,
  Modal,
} from 'react-native';

import {
  App,
} from './app/android/components';

import {
  MoviesPage,
  MoviePage,
  SearchPage,
} from './app/android/containers';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

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
  }

  componentDidMount() {
    RouterStore.listen(this.handleRouterStoreChange);
  }

  componentWillUnmount() {
    RouterStore.unlisten(this.handleRouterStoreChange);
  }

  handleRouterStoreChange(store) {
    this.setState({
      modal: store.modal,
      movie: store.movies[store.movies.length-1],
    });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <App/>
          {
            !!this.state.movie &&
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={true}
              onRequestClose={() => console.log('closed modal')}
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
              onRequestClose={() => console.log('closed modal')}
            >
              <SearchPage/>
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

import React, { Component} from 'react';
import { ActionButton } from 'react-native-material-ui';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Toolbar } from 'react-native-material-ui';
import RouterActions from '../../router/actions';

import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import {
  Overview,
  Cast,
} from './components';

import {
  MovieGrid,
} from '../../components/';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.movieId,
      movie: undefined,
      watched: false,
      favorite: false,
      watchLater: false,
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
    this.handleOnWatchedClick       = this.handleOnWatchedClick.bind(this);
    this.handleOnWatchLaterClick    = this.handleOnWatchLaterClick.bind(this);
    this.handleOnFavoriteClick      = this.handleOnFavoriteClick.bind(this);
    this.handleOnLeftElementPress   = this.handleOnLeftElementPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //If the movie id param has changed load new movie
    /*if(nextProps.params.id != this.state.id) {
      this.setState({
        id: nextProps.params.id,
        movie: undefined,
        watched: false,
        favorite: false,
        watchLater: false,
      });
      this.getMovieInfo(nextProps.params.id);
    }*/
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({
        watched: false,
        favorite: false,
        watchLater: false,
      });
      this.getMovieInfo(this.props.params.id);
    }
  }

  componentDidMount() {
    MovieInfoStore.listen(this.handleMovieInfoStoreChange);
    this.getMovieInfo(this.state.id);
  }

  componentWillUnmount() {
    MovieInfoStore.unlisten(this.handleMovieInfoStoreChange);
  }

  getMovieInfo(id) {
    if(this.props.isLoggedIn) {
      MovieInfoActions.getAuthMovieInfo(id);
    } else {
      MovieInfoActions.getMovieInfo(id);
    }
  }

  handleMovieInfoStoreChange(store) {
    console.log('movie', store)
    this.setState({
      movie: store.movie,
      watched: store.watched,
      favorite: store.favorite,
      watchLater: store.watchLater,
    });
  }

  handleOnWatchedClick() {
    if(!this.state.watched) {
      MovieInfoActions.watchedMovie(this.state.id);
    } else {
      MovieInfoActions.removeWatchedMovie(this.state.id)
    }
    this.setState({ watched: true });
  }

  handleOnWatchLaterClick() {
    if(!this.state.watchLater) {
      MovieInfoActions.watchLaterMovie(this.state.id);
    } else {
      MovieInfoActions.removeWatchLaterMovie(this.state.id)
    }
    this.setState({ watchLater: true });
  }

  handleOnFavoriteClick() {
    if(!this.state.favorite) {
      MovieInfoActions.favoriteMovie(this.state.id);
    } else {
      MovieInfoActions.removeFavoriteMovie(this.state.id)
    }
    this.setState({ favorite: true });
  }

  handleOnLeftElementPress() {
    RouterActions.removeMovie();
  }

  render() {
    const movie = this.state.movie;

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => this.handleOnLeftElementPress()}
          style={{
            container: {
              backgroundColor: 'rgba(0,0,0,0)',
              position: 'absolute',
              zIndex: 100,
            },
          }}
        />
        {
          !!movie &&
          <View style={styles.container}>
            <Image
              style={styles.backdrop}
              source={{ uri: 'http://image.tmdb.org/t/p/w1280' + movie.backdrop_path}}/>
            <ScrollableTabView
              style={styles.container}
              tabBarUnderlineStyle={styles.underline}
              tabBarBackgroundColor='#5e35b1'
              tabBarInactiveTextColor='rgba(255, 255, 255, 0.7)'
              tabBarActiveTextColor='white'
              tabBarTextStyle={{fontSize: 14, fontWeight: '500'}}>
              <View style={styles.container} tabLabel='DETAILS'>
                <Overview movie={movie}/>
              </View>
              <View style={styles.container} tabLabel='CAST'>
                <Cast cast={movie.credits.cast}/>
              </View>
            </ScrollableTabView>
          </View>
        }
        <ActionButton
          icon='add'
          actions={[
            {
              icon: 'favorite',
              label: (this.state.favorite) ? 'Remove From Favorites' : 'Add To Favorites'
            },
            {
              icon: 'visibility',
              label: (this.state.watched) ? 'Remove From Watched' : 'Add To Watched'
            },
            {
              icon: 'watch-later',
              label: (this.state.watchLater) ? 'Remove from Watch Later' : 'Add To Watch Later'
            },
          ]}
          transition={'speedDial'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flex: 1,
    flexDirection: 'column',
  },
  backdrop: {
    height: 200,
  },
  underline: {
    backgroundColor: '#ffc107',
  },
});

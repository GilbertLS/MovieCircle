import React, { Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

import { ActionButton } from 'react-native-material-ui';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import {
  MovieGrid,
} from '../../components/';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 500,
      movie: undefined,
      watched: false,
      favorite: false,
      watchLater: false,
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
    this.handleOnWatchedClick       = this.handleOnWatchedClick.bind(this);
    this.handleOnWatchLaterClick    = this.handleOnWatchLaterClick.bind(this);
    this.handleOnFavoriteClick      = this.handleOnFavoriteClick.bind(this);
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

  render() {
    const movie = this.state.movie;

    return (
      <View style={styles.container}>
        {
          !!movie &&
          <View style={styles.container}>
            <Image
              style={styles.backdrop}
              source={{ uri: 'http://image.tmdb.org/t/p/w1280' + movie.backdrop_path}}/>
          </View>
        }
        <ActionButton
          icon='add'
          actions={[
            { icon: 'favorite', label: 'Add To Favorites' },
            { icon: 'visibility-on', label: 'Add To Watched'},
            { icon: 'watch-later', label: 'Add To Watch Later'},
          ]}
          transition={'speedDial'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backdrop: {
    height: 300,
  },
});

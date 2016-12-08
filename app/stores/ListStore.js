import alt from '../alt';
import MovieInfoStore from '../stores/MovieInfoStore';
import ListActions from '../actions/ListActions';
import MovieInfoActions from '../actions/MovieInfoActions';
import update from 'immutability-helper';

class ListStore {
  constructor() {
    this.bindListeners({
      _handleGetFavoriteMovies: ListActions.GET_FAVORITE_MOVIES,
      _handleGetWatchedMovies: ListActions.GET_WATCHED_MOVIES,
      _handleGetWatchLaterMovies: ListActions.GET_WATCH_LATER_MOVIES,
      _handleClear: ListActions.CLEAR,
      _handleFavoriteMovie: MovieInfoActions.FAVORITE_MOVIE,
      _handleRemoveFavoriteMovie: MovieInfoActions.REMOVE_FAVORITE_MOVIE,
      _handleWatchedMovie: MovieInfoActions.WATCHED_MOVIE,
      _handleRemoveWatchedMovie: MovieInfoActions.REMOVE_WATCHED_MOVIE,
      _handleWatchLaterMovie: MovieInfoActions.WATCH_LATER_MOVIE,
      _handleRemoveWatchLaterMovie: MovieInfoActions.REMOVE_WATCH_LATER_MOVIE,
    });

    this.exportPublicMethods({
      getFavoriteMovies: this.getFavoriteMovies,
      getWatchedMovies: this.getWatchedMovies,
      getWatchLaterMovies: this.getWatchLaterMovies,
    });

    this.state = {
      favorites: [],
      watchLater: [],
      watched: [],
    };
  }

  _handleGetFavoriteMovies(response) {
    this.setState({
      favorites: this.state.favorites.concat([response]),
    });
  }

  _handleGetWatchedMovies(response) {
    this.setState({
      watched: this.state.watched.concat([response]),
    });
  }

  _handleGetWatchLaterMovies(response) {
    this.setState({
      watchLater: this.state.watchLater.concat([response]),
    });
  }

  _handleClear() {
    this.setState({
      favorites: [],
      watched: [],
      watchLater: [],
    });
  }

  _handleFavoriteMovie(success) {
    const movie = MovieInfoStore.getMovie();

    if(!!success) {
      const newFavorites = this._addMovieToArray(this.state.favorites, movie);

      if(newFavorites)
        this.setState({ favorites: newFavorites });
    }
  }

  _handleRemoveFavoriteMovie(movieId) {
    const newFavorites = this._removeMovieFromArray(this.state.favorites, movieId);

    if(newFavorites)
      this.setState({ favorites: newFavorites });
  }

  _handleWatchedMovie(success) {
    const movie = MovieInfoStore.getMovie();

    if(!!success) {
      const newWatched = this._addMovieToArray(this.state.watched, movie);

      if(newWatched)
        this.setState({ watched: newWatched });
    }
  }

  _handleRemoveWatchedMovie(movieId) {
    const newWatched = this._removeMovieFromArray(this.state.watched, movieId);

    if(newWatched)
      this.setState({ watched: newWatched });
  }

  _handleWatchLaterMovie(success) {
    const movie = MovieInfoStore.getMovie();

    if(!!success) {
      const newWatchLater = this._addMovieToArray(this.state.watchLater, movie);

      if(newWatchLater)
        this.setState({ watchLater: newWatchLater });
    }
  }

  _handleRemoveWatchLaterMovie(movieId) {
    const newWatchLater = this._removeMovieFromArray(this.state.watchLater, movieId);

    if(newWatchLater)
      this.setState({ watchLater: newWatchLater });
  }

  _addMovieToArray(array, movie) {
    const indexes = this._findMovieInArray(array, movie.id);

    if(!indexes && array.length > 0) {
      let newArray = update(array, {0: {$unshift: [movie]}});
      return newArray;
    }
  }

  _removeMovieFromArray(array, movieId) {
    const indexes = this._findMovieInArray(array, movieId);

    if(!!indexes && indexes.length == 2) {
      const row    = array[indexes[0]];
      let newRow   = update(row, {$splice: [[indexes[1], 1]]});
      let newArray = update(array, {$splice: [[indexes[0], 1, newRow]]})
      return newArray;
    }
  }

  _findMovieInArray(array, movieId) {
    for(var i = 0; i < array.length; i++) {
      for(var j = 0; j < array[i].length; j++) {
        if(array[i][j].id == movieId)
          return [i, j];
      }
    }

    return undefined;
  }

  getFavoriteMovies(page) {
    if(page && page > 0) {
      return this.state.favorites[page-1];
    } else {
      return [];
    }
  }

  getWatchedMovies(page) {
    if(page && page > 0) {
      return this.state.watched[page-1];
    } else {
      return [];
    }
  }

  getWatchLaterMovies(page) {
    if(page && page > 0) {
      return this.state.watchLater[page-1];
    } else {
      return [];
    }
  }
}

export default alt.createStore(ListStore, 'ListStore');

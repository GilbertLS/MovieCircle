import alt from '../alt';
import MovieInfoActions from '../actions/MovieInfoActions';

class MovieInfoStore {
  constructor() {
    this.bindListeners({
      _handleGetMovieInfo: MovieInfoActions.GET_MOVIE_INFO,
      _handleFavoriteMovie: MovieInfoActions.FAVORITE_MOVIE,
      _handleRemoveFavoriteMovie: MovieInfoActions.REMOVE_FAVORITE_MOVIE,
      _handleWatchedMovie: MovieInfoActions.WATCHED_MOVIE,
      _handleRemoveWatchedMovie: MovieInfoActions.REMOVE_WATCHED_MOVIE,
      _handleWatchLaterMovie: MovieInfoActions.WATCH_LATER_MOVIE,
      _handleRemoveWatchLaterMovie: MovieInfoActions.REMOVE_WATCH_LATER_MOVIE,
    });

    this.exportPublicMethods({

    });

    this.state = {
      movie: undefined,
      watched: false,
      watchLater: false,
      favorite: false,
    };
  }

  _handleGetMovieInfo(response) {
    if(response.videos) {
      let i = response.videos.results.length;
      while(i--) {
        if(response.videos.results[i].site != 'YouTube') {
          response.videos.results.splice(i, 1);
        }
      }
    }

    this.setState({
      movie: response,
    });
  }

  _handleFavoriteMovie(success) {
    if(!!success) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
  }

  _handleRemoveFavoriteMovie(success) {
    if(!!success) {
      this.setState({ favorite: false });
    } else {
      this.setState({ favorite: true });
    }
  }

  _handleWatchedMovie(success) {
    if(!!success) {
      this.setState({ watched: true });
    } else {
      this.setState({ watched: false });
    }
  }

  _handleRemoveWatchedMovie(success) {
    if(!!success) {
      this.setState({ watched: false });
    } else {
      this.setState({ watched: true });
    }
  }

  _handleWatchLaterMovie(success) {
    if(!!success) {
      this.setState({ watchLater: true });
    } else {
      this.setState({ watchLater: false });
    }
  }

  _handleRemoveWatchLaterMovie(success) {
    if(!!success) {
      this.setState({ watchLater: false });
    } else {
      this.setState({ watchLater: true });
    }
  }
}

export default alt.createStore(MovieInfoStore, 'MovieInfoStore');

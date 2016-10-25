import alt from '../alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.bindListeners({
      _handleGetFavoriteMovies: ListActions.GET_FAVORITE_MOVIES,
      _handleGetWatchedMovies: ListActions.GET_WATCHED_MOVIES,
      _handleGetWatchLaterMovies: ListActions.GET_WATCH_LATER_MOVIES,
    });

    this.exportPublicMethods({
      getFavoriteMovies: this.getFavoriteMovies,
      getWatchedMovies: this.getWatchedMovies,
      getWatchLaterMovies: this.getWatchLaterMovies,
      clear: this.clear,
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

  clear() {
    this.setState({
      favorites: [],
      watched: [],
      watchLater: [],
    });
  }
}

export default alt.createStore(ListStore, 'ListStore');

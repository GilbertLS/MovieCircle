import alt from '../alt';
import MovieInfoActions from '../actions/MovieInfoActions';

class MovieInfoStore {
  constructor() {
    this.bindListeners({
      _handleGetMovieInfo: MovieInfoActions.GET_MOVIE_INFO,
      _handleClearMovieInfo: MovieInfoActions.CLEAR_MOVIE_INFO,
    });

    this.exportPublicMethods({

    });

    this.state = {
      movie: undefined,
    };
  }

  _handleGetMovieInfo(response) {
    this.setState({
      movie: response,
    });
  }

  _handleClearMovieInfo() {
    this.setState({
      movie: undefined,
    });
  }
}

export default alt.createStore(MovieInfoStore, 'MovieInfoStore');

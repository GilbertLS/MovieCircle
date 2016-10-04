import alt from '../alt';
import MovieInfoActions from '../actions/MovieActions';

class MovieInfoStore {
  constructor() {
    this.bindListeners({
      //_handleGetMovieInfo: MovieInfoActions.GET_MOVIE_INFO,
    });

    this.exportPublicMethods({

    });

    this.state = {
      movies: {},
    };
  }

  _handleGetMovieInfo(response) {

  }
}

export default alt.createStore(MovieInfoStore, 'MovieInfoStore');

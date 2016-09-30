import alt from '../alt';
import MovieActions from '../actions/MovieActions';

class MovieStore {
  constructor() {
    this.bindListeners({
      _handleGetPopularMovies: MovieActions.GET_POPULAR_MOVIES,
    });

    this.exportPublicMethods({

    });

    this.state = {
      popular: [],
    };
  }

  _handleGetPopularMovies(response) {
    this.setState({
      popular: this.state.popular.concat(response),
    });
  }

  getPopularMovies() {
    return this.state.popular;
  }
}

export default alt.createStore(MovieStore, 'MovieStore');

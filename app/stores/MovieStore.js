import alt from '../alt';
import MovieActions from '../actions/MovieActions';
import UserAction from '../actions/UserActions';

class MovieStore {
  constructor() {
    this.bindListeners({
      _handleGetPopularMovies: MovieActions.GET_POPULAR_MOVIES,
      _handleGetNowPlayingMovies: MovieActions.GET_NOW_PLAYING_MOVIES,
      _handleGetTopRatedMovies: MovieActions.GET_TOP_RATED_MOVIES,
      _handleGetUpcomingMovies: MovieActions.GET_UPCOMING_MOVIES,
    });

    this.exportPublicMethods({
      getPopularMovies: this.getPopularMovies,
      getNowPlayingMovies: this.getNowPlayingMovies,
      getTopRatedMovies: this.getTopRatedMovies,
      getUpcomingMovies: this.getUpcomingMovies,
    });

    this.state = {
      popular: [],
      nowPlaying: [],
      upcoming: [],
      topRated: [],
    };
  }

  _handleGetPopularMovies(response) {
    this.setState({
      popular: this.state.popular.concat([response]),
    });
  }

  _handleGetNowPlayingMovies(response) {
    this.setState({
      nowPlaying: this.state.nowPlaying.concat([response]),
    });
  }

  _handleGetTopRatedMovies(response) {
    this.setState({
      topRated: this.state.topRated.concat([response]),
    });
  }

  _handleGetUpcomingMovies(response) {
    this.setState({
      upcoming: this.state.upcoming.concat([response]),
    });
  }

  getPopularMovies(page) {
    if(page && page > 0) {
      return this.state.popular[page-1];
    } else {
      return [];
    }
  }

  getNowPlayingMovies(page) {
    if(page && page > 0) {
      return this.state.nowPlaying[page-1];
    } else {
      return [];
    }
  }

  getTopRatedMovies(page) {
    if(page && page > 0) {
      return this.state.topRated[page-1];
    } else {
      return [];
    }
  }

  getUpcomingMovies(page) {
    if(page && page > 0) {
      return this.state.upcoming[page-1];
    } else {
      return [];
    }
  }
}

export default alt.createStore(MovieStore, 'MovieStore');

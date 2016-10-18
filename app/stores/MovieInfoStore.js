import alt from '../alt';
import MovieInfoActions from '../actions/MovieInfoActions';

class MovieInfoStore {
  constructor() {
    this.bindListeners({
      _handleGetMovieInfo: MovieInfoActions.GET_MOVIE_INFO,
    });

    this.exportPublicMethods({

    });

    this.state = {
      movie: undefined,
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
}

export default alt.createStore(MovieInfoStore, 'MovieInfoStore');

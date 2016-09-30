import alt from '../alt';
import MovieAPI from '../api/MovieAPI';

class MovieActions {
  getPopularMovies(page) {
    return (dispatch) => {
      MovieAPI.getPopularMovies(page, (response) => {
        if(response && Array.isArray(response.results)) {
          dispatch(response.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    }
  }

  getNowPlayingMovies() {

  }

  getTopRatedMovies() {

  }

  getUpcomingMovies() {

  }
}

export default alt.createActions(MovieActions);

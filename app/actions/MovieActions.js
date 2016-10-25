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

  getNowPlayingMovies(page) {
    return (dispatch) => {
      MovieAPI.getNowPlayingMovies(page, (response) => {
        if(response && Array.isArray(response.results)) {
          dispatch(response.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    }
  }

  getTopRatedMovies(page) {
    return (dispatch) => {
      MovieAPI.getTopRatedMovies(page, (response) => {
        if(response && Array.isArray(response.results)) {
          dispatch(response.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    }
  }

  getUpcomingMovies(page) {
    return (dispatch) => {
      MovieAPI.getUpcomingMovies(page, (response) => {
        if(response && Array.isArray(response.results)) {
          dispatch(response.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    }
  }
}

export default alt.createActions(MovieActions);

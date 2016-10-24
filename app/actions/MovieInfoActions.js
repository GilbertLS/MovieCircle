import alt from '../alt';
import MovieAPI from '../api/MovieAPI';
import FacebookStore from '../stores/FacebookStore';

class MovieInfoActions {
  getMovieInfo(id) {
    return (dispatch) => {
      MovieAPI.getMovieInfo(id, (response) => {
        if(response) {
          dispatch(response);
        } else {
          //Error Handling
          dispatch({});
        }
      });
    }
  }

  favoriteMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.favoriteMovie);
  }

  removeFavoriteMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.removeFavoriteMovie);
  }

  watchedMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.watchedMovie);
  }

  removeWatchedMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.removeWatchedMovie);
  }

  watchLaterMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.watchLaterMovie);
  }

  removeWatchLaterMovie(movieId) {
    return callUserRouteDispatch(movieId, MovieAPI.removeWatchLaterMovie);
  }
}

const callUserRouteDispatch = function(movieId, movieAPIFunction) {
  const auth = FacebookStore.getAuth();

  return (dispatch) => {
    movieAPIFunction(movieId, auth, (status) => {
      if(status == 200) {
        dispatch(true);
      } else {
        //Error Handling
        dispatch(false);
      }
    });
  }
}

export default alt.createActions(MovieInfoActions);

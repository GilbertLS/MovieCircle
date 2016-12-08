import alt from '../alt';
import MovieAPI from '../api/MovieAPI';
import UserAPI from '../api/UserAPI';
import FacebookStore from '../stores/FacebookStore';

class MovieInfoActions {
  getMovieInfo(movieId) {
    return (dispatch) => {
      MovieAPI.getMovieInfo(movieId, (response) => {
        if(response) {
          dispatch(response);
        } else {
          //Error Handling
          dispatch({});
        }
      });
    }
  }

  getAuthMovieInfo(movieId) {
    const auth = FacebookStore.getAuth();

    return (dispatch) => {
      MovieAPI.getAuthMovieInfo(movieId, auth, (response) => {
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
    return callUserRouteDispatch(movieId, UserAPI.favoriteMovie);
  }

  removeFavoriteMovie(movieId) {
    return callUserRouteDispatch(movieId, UserAPI.removeFavoriteMovie);
  }

  watchedMovie(movieId) {
    return callUserRouteDispatch(movieId, UserAPI.watchedMovie);
  }

  removeWatchedMovie(movieId) {
    return callUserRouteDispatch(movieId, UserAPI.removeWatchedMovie);
  }

  watchLaterMovie(movieId) {
    return callUserRouteDispatch(movieId, UserAPI.watchLaterMovie);
  }

  removeWatchLaterMovie(movieId) {
    return callUserRouteDispatch(movieId, UserAPI.removeWatchLaterMovie);
  }
}

const callUserRouteDispatch = function(movieId, userAPIFunction) {
  const auth = FacebookStore.getAuth();

  return (dispatch) => {
    userAPIFunction(movieId, auth, (response) => {
      if(response.status == 200) {
        dispatch(movieId);
      } else {
        //Error Handling
        dispatch(false);
      }
    });
  }
}

export default alt.createActions(MovieInfoActions);

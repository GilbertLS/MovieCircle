import alt from '../alt';
import UserAPI from '../api/UserAPI';
import FacebookStore from '../stores/FacebookStore';

class ListActions {
  getFavoriteMovies(page) {
    return callUserRouteDispatch(page, UserAPI.getFavoriteMovies);
  }
  
  getWatchedMovies(page) {
    return callUserRouteDispatch(page, UserAPI.getWatchedMovies);
  }

  getWatchLaterMovies(page) {
    return callUserRouteDispatch(page, UserAPI.getWatchLaterMovies);
  }
}

const callUserRouteDispatch = function(page, userAPIFunction) {
  const auth = FacebookStore.getAuth();

  return (dispatch) => {
    userAPIFunction(page, auth, (response) => {
      if(response.status !== 200) {
        //Error Handling
        dispatch([]);
      }

      response.json()
      .then((json) => {
        console.log('Get', json);
        if(json && Array.isArray(json.results)) {
          dispatch(json.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    });
  };
}

export default alt.createActions(ListActions);

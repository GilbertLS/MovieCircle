import alt from '../alt';
import MovieAPI from '../api/MovieAPI';

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
}

export default alt.createActions(MovieInfoActions);

import alt from '../alt';
import MovieAPI from '../api/MovieAPI';

class SearchActions {
  searchMovies(query, page) {
    return (dispatch) => {
      MovieAPI.searchMovies(query, page, (response) => {
        if(response && Array.isArray(response.results)) {
          dispatch(response.results);
        } else {
          //Error Handling
          dispatch([]);
        }
      });
    }
  }

  clearMovies() {
    return true;
  }
}

export default alt.createActions(SearchActions);

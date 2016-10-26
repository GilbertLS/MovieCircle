import config from '../config.js';
const URL = config.backendURL;

export default {
  getPopularMovies(page, callback) {
    getMovies('/movie/popular/' + page, callback);
  },
  getUpcomingMovies(page, callback) {
    getMovies('/movie/upcoming/' + page, callback);
  },
  getTopRatedMovies(page, callback) {
    getMovies('/movie/top_rated/' + page, callback);
  },
  getNowPlayingMovies(page, callback) {
    getMovies('/movie/now_playing/' + page, callback);
  },
  searchMovies(query, page, callback) {
    getMovies('/search/' + query + '/' + page, callback);
  },
  getMovieInfo(id, callback) {
    getMovies('/movie/' + id, callback);
  },
  getAuthMovieInfo(movieId, authObject, callback) {
    getMovies(
      '/movie/' + movieId + '/user/' + authObject.userID,
      callback,
      authObject
    );
  }
};

const getMovies = (path, callback, authObject) => {
  fetch(URL + '/api' + path, {
    method: 'GET',
    headers: {
      "Authorization": (!!authObject) ? authObject.accessToken : '',
    },
  })
  .then((response) => {return response.json()})
  .then((response) => {
    console.log(response);
    callback(response);
  });
};

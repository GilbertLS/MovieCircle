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
    getMovies('/movie/' + id + '?append_to_response=videos,recommendations,credits', callback);
  },
};

const getMovies = (path, callback) => {
  fetch(URL + '/api' + path, {
    method: 'GET',
  })
  .then((response) => {return response.json()})
  .then((response) => {
    console.log(response);
    callback(response);
  });
};

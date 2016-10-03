const URL = 'http://192.168.1.126:3001/movieapi';

const getMovies = (path, callback) => {
  fetch(URL, {
    method: 'GET',
    headers: {
      "path": path,
    },
  })
  .then((response) => {return response.json()})
  .then((response) => {
    console.log(response);
    callback(response);
  });
};

export default {
  getPopularMovies(page, callback) {
    getMovies('/movie/popular?page=' + page, callback);
  },
  getUpcomingMovies(page, callback) {
    getMovies('/movie/upcoming?page=' + page, callback);
  },
  getTopRatedMovies(page, callback) {
    getMovies('/movie/top_rated?page=' + page, callback);
  },
  getNowPlayingMovies(page, callback) {
    getMovies('/movie/now_playing?page=' + page, callback);
  },
  searchMovies(query, page, callback) {
    getMovies('/search/movie?query=' + query + '&page=' + page, callback);
  }
}

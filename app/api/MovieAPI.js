const URL = 'http://192.168.1.126:3001';

const getMovies = (path, callback) => {
  fetch(URL + '/movieapi', {
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
  },
  getMovieInfo(id, callback) {
    getMovies('/movie/' + id + '?append_to_response=videos,recommendations,credits', callback);
  },
  favoriteMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/favorite/' + movieId;
    const method = 'POST';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  removeFavoriteMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/favorite/' + movieId;
    const method = 'DELETE';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  watchedMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watched/' + movieId;
    const method = 'POST';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  removeWatchedMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watched/' + movieId;
    const method = 'DELETE';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  watchLaterMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watchlater/' + movieId;
    const method = 'POST';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  removeWatchLaterMovie(movieId, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watchlater/' + movieId;
    const method = 'DELETE';

    callUserRoute(path, method, authObject.accessToken, callback);
  }
}

const callUserRoute = function(path, method, accessToken, callback) {
  fetch(path, {
    method: method,
    headers: {
      "Authorization": accessToken,
    },
  })
  .then((response) => {
    console.log(response.status);
    callback(response.status);
  })
  .catch((err) => {
    callback(err);
  });
};

import config from '../config.js';
const URL = config.backendURL;

export default {
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
  },
  getFavoriteMovies(page, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/favorite/' + page;
    const method = 'GET';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  getWatchedMovies(page, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watched/' + page;
    const method = 'GET';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
  getWatchLaterMovies(page, authObject, callback) {
    const path = URL + '/api/user/' + authObject.userID + '/watchlater/' + page;
    const method = 'GET';

    callUserRoute(path, method, authObject.accessToken, callback);
  },
};

const callUserRoute = function(path, method, accessToken, callback) {
  fetch(path, {
    method: method,
    headers: {
      "Authorization": accessToken,
    },
  })
  .then((response) => {
    callback(response);
  })
  .catch((err) => {
    callback(err);
  });
};

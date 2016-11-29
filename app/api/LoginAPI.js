import config from '../config.js';
const URL = config.backendURL + '/api/';

export default {
  loginFacebook(authObject, callback) {
    fetch(URL + 'login', {
      method: 'GET',
      headers: {
        "Authorization": authObject.accessToken,
      },
    })
    .then((response) => {
      callback(response);
    });
  }
}

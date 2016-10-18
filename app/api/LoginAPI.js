const URL = 'http://localhost:3001/api/';

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

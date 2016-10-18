const URL = 'http://192.168.1.126:3001/api/';

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

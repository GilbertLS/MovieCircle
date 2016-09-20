const URL = 'http://localhost:3001/api/';

export default {
  verifyFacebook(authObject, callback) {
    fetch(URL + 'verifyfacebook', {
      method: 'GET',
      headers: {
        "Authorization": authObject.accessToken,
      },
    })
    .then((response) => {return response.json()})
    .then((response) => {
      callback(response);
    });
  }
}

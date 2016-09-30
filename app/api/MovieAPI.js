const URL = 'http://localhost:3001/movieapi';

export default {
  getPopularMovies(page, callback) {
    fetch(URL, {
      method: 'GET',
      headers: {
        "path": '/movie/popular?page=' + page,
      },
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
      callback(response);
    });
  }
}

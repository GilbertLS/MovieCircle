import alt from '../../alt';

class RouterActions {
  addModal(path) {
    return path;
  }

  removeModal() {
    return true;
  }

  addMovie(movieId, movieObject) {
    return {
      movieId: movieId,
      movieObject: movieObject,
    };
  }

  removeMovie() {
    return true;
  }

  replaceMovie(movieId, movieObject) {
    return {
      movieId: movieId,
      movieObject: movieObject,
    };
  }
}

export default alt.createActions(RouterActions);

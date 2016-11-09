import alt from '../../alt';

class RouterActions {
  addModal(path) {
    return path;
  }

  removeModal() {
    return true;
  }

  addMovie(movieId) {
    return movieId;
  }

  removeMovie() {
    return true;
  }
}

export default alt.createActions(RouterActions);

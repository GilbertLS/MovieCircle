import alt from '../../alt';

class RouterActions {
  addModal(path) {
    return path;
  }

  removeModal() {
    return true;
  }

  addMovie(movieObject) {
    return movieObject;
  }

  removeMovie() {
    return true;
  }

  replaceMovie(movieObject) {
    return movieObject;
  }
}

export default alt.createActions(RouterActions);

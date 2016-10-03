import alt from '../alt';
import MovieInfoActions from '../actions/MovieActions';

class MovieInfoStore {
  constructor() {
    this.bindListeners({

    });

    this.exportPublicMethods({

    });

    this.state = {
      movies: [],
    };
  }
}

export default alt.createStore(MovieInfoStore, 'MovieInfoStore');

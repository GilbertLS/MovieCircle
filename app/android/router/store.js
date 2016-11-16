import alt from '../../alt';
import Actions from './actions';

class RouterStore {
  constructor() {
    this.bindListeners({
      _handleAddModal: Actions.ADD_MODAL,
      _handleRemoveModal: Actions.REMOVE_MODAL,
      _handleAddMovie: Actions.ADD_MOVIE,
      _handleRemoveMovie: Actions.REMOVE_MOVIE,
      _handleReplaceMovie: Actions.REPLACE_MOVIE,
    });

    this.exportPublicMethods({

    });

    this.state = {
      modal: undefined,
      movies: [],
    };
  }

  _handleAddModal(name) {
    this.setState({
      modal: name
    });
  }

  _handleRemoveModal() {
    this.setState({
      modal: undefined,
    });
  }

  _handleAddMovie(object) {
    this.setState({
      movies: this.state.movies.concat([object]),
    });
  }

  _handleRemoveMovie() {
    this.setState({
      movies: this.state.movies.slice(0, this.state.movies.length-1),
    })
  }

  _handleReplaceMovie(object) {
    this.setState({
        movies: this.state.movies.slice(0, this.state.movies.length-1).concat([object]),
    });
  }
}

export default alt.createStore(RouterStore, 'RouterStore');

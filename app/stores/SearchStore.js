import alt from '../alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
  constructor() {
    this.bindListeners({
      _handleSearchMovies: SearchActions.SEARCH_MOVIES,
      _handleClearMovies: SearchActions.CLEAR_MOVIES,
    });

    this.exportPublicMethods({
      getSearch: this.getSearch,
    });

    this.state = {
      search: [],
    };
  }

  _handleSearchMovies(response) {
    this.setState({
      search: this.state.search.concat([response]),
    });
  }

  _handleClearMovies() {
    this.setState({
      search: []
    });
  }

  getSearch(page) {
    if(page && page > 0) {
      return this.state.search[page-1];
    } else {
      return [];
    }
  }
}

export default alt.createStore(SearchStore, 'SearchStore');

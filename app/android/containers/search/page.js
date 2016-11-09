import React, { Component} from 'react';
import SearchActions from '../../../actions/SearchActions';
import SearchStore from '../../../stores/SearchStore';
import { Toolbar } from 'react-native-material-ui';
import RouterActions from '../../router/actions';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  MovieGrid,
} from '../../components';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      index: 0,
      movies: [],
      page: 1,
      loading: false,
    }

    this.handleSearchStoreChange = this.handleSearchStoreChange.bind(this);
    this.handleonSubmitEditing = this.handleonSubmitEditing.bind(this);
    this.handleOnSearchClosed = this.handleOnSearchClosed.bind(this);
  }

  componentDidMount() {
    SearchStore.listen(this.handleSearchStoreChange);
    SearchActions.clearMovies();
  }

  componentWillUnmount() {
    SearchStore.unlisten(this.handleSearchStoreChange);
  }

  handleSearchStoreChange(store) {
    const currentPage = SearchStore.getSearch(this.state.page);
    if(currentPage && currentPage.length > 0) {
      //Page has movies in it
      //So we display it
      this.setState({
        page: this.state.page + 1,
        movies: this.state.movies.concat(currentPage),
        loading: false,
      });
    } else if (currentPage){
      //Page is empty
      //Do not get anymore movies
      this.setState({
        loading: false,
        end: true,
      });
    }
  }

  handleonSubmitEditing() {
    this.getMovies();
  }

  handleOnChangeText(text) {
    if(this.state.movies.length > 0) {
      SearchActions.clearMovies();
      this.setState({
        query: text,
        index: 0,
        movies: [],
        page: 1,
        loading: false,
      });
    } else {
      this.setState({
        query: text,
        index: 0,
        page: 1,
      });
    }
  }

  handleOnSearchClosed() {
    RouterActions.removeModal();
  }

  getMovies() {
    if(!this.state.loading && this.state.query.length > 0) {
      SearchActions.searchMovies(this.state.query, this.state.page)
      this.setState({
        loading: true,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          searchable={{
            autoFocus: true,
            placeholder: 'Search for movies by title',
            onSubmitEditing: () => this.handleonSubmitEditing(),
            onChangeText: (text) => this.handleOnChangeText(text),
            onSearchClosed: () => this.handleOnSearchClosed(),
          }}
          isSearchActive={true}
        />
        {
          !!this.state.loading &&
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size={60} color='#ffc107' />
          </View>
        }
        <MovieGrid movies={this.state.movies}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222',
  },
  indicatorContainer: {
    paddingTop: 20,
  },
});

import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import SearchActions from '../../../actions/SearchActions';
import SearchStore from '../../../stores/SearchStore';

import {
  ProgressBar,
} from 'react-toolbox';

import {
  MovieGrid
} from '../../components';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.params.query,
      index: 0,
      movies: [],
      page: 1,
      loading: false,
    }

    this.handleSearchStoreChange = this.handleSearchStoreChange.bind(this);
    this.handleScroll            = this.handleScroll.bind(this);
  }

  componentDidMount() {
    SearchStore.listen(this.handleSearchStoreChange);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    SearchActions.clearMovies();
  }

  componentWillReceiveProps(props) {
    this.setState({
      query: props.params.query,
      index: 0,
      movies: [],
      page: 1,
      loading: false,
      end: false,
    });
  }

  componentWillUnmount() {
    SearchStore.unlisten(this.handleSearchStoreChange);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  componentDidUpdate() {
    if(this.state.movies && this.state.movies.length == 0) {
      SearchActions.clearMovies();
    }
  }

  handleSearchStoreChange(store) {
    this.getMovies();
  }

  getMovies() {
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
    } else if(!this.state.loading) {
      //Page does not exist yet
      //Perform action to get page
      SearchActions.searchMovies(this.state.query, this.state.page)
      this.setState({
        loading: true,
      });
    }
  }

  handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (!this.state.loading && !this.state.end && (scrollTop + window.innerHeight) >= scrollHeight) {
      this.getMovies();
    }
  }

  render() {
    return (
      <div>
      <MovieGrid movies={this.state.movies}/>
      {
        this.state.loading &&
        <div className={style.progressBar}>
          <ProgressBar type='circular' mode='indeterminate' multicolor />
        </div>
      }
      </div>
    );
  }
}

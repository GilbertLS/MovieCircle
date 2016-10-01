import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import MovieActions from '../../../actions/MovieActions';
import MovieStore from '../../../stores/MovieStore';

import {
  Tab,
  Tabs,
} from 'react-toolbox';

import {
  MovieGrid
} from '../../components';

import theme from './theme.scss';

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      movies: [],
    }

    this.handleMovieStoreChange = this.handleMovieStoreChange.bind(this);
    this.handleTabChange        = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    MovieStore.listen(this.handleMovieStoreChange);
    MovieActions.getPopularMovies(2);
  }

  componentWillUnmount() {
    MovieStore.unlisten(this.handleMovieStoreChange);
  }

  handleMovieStoreChange(state) {
    this.setState({
      movies: state.popular,
    });
  }

  handleTabChange(i) {
    this.setState({index: i});
  }

  render() {
    return (
      <div>
        <div style={{overflowX: 'auto', position: 'fixed', width: '100%', zIndex: 101}}>
          <div style={{minWidth: '410px'}}>
            <Tabs theme={theme} index={this.state.index} onChange={this.handleTabChange} inverse>
              <Tab label='Trending'></Tab>
              <Tab label='Top Rated'></Tab>
              <Tab label='Now Playing'></Tab>
              <Tab label='Upcoming'></Tab>
            </Tabs>
          </div>
        </div>
        <div style={{paddingTop: '4.8rem'}}>
          <MovieGrid movies={this.state.movies}/>
        </div>
      </div>
    );
  }
}

import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import MovieActions from '../../../actions/MovieActions';
import MovieStore from '../../../stores/MovieStore';

import {
  Tab,
  Tabs,
  ProgressBar,
} from 'react-toolbox';

import {
  MovieGrid
} from '../../components';

import theme from './theme.scss';

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      movies: [],
      page: 1,
      loading: false,
    }

    this.handleMovieStoreChange = this.handleMovieStoreChange.bind(this);
    this.handleTabChange        = this.handleTabChange.bind(this);
    this.handleScroll           = this.handleScroll.bind(this);
  }

  componentDidMount() {
    MovieStore.listen(this.handleMovieStoreChange);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.getMovies();
  }

  componentWillUnmount() {
    MovieStore.unlisten(this.handleMovieStoreChange);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  componentDidUpdate() {
    if(this.state.movies && this.state.movies.length == 0) {
      console.log('update');
      this.getMovies();
    }
  }

  handleMovieStoreChange(store) {
    this.getMovies();
  }

  getMovies() {
    const getPage = (storeOrActions) => {
        switch(this.state.index) {
          case 1:
            return storeOrActions.getTopRatedMovies(this.state.page);
            break;
          case 2:
            return storeOrActions.getUpcomingMovies(this.state.page);
            break;
          case 3:
            return storeOrActions.getNowPlayingMovies(this.state.page);
            break;
          default:
            return storeOrActions.getPopularMovies(this.state.page);
        }
    }

    const currentPage = getPage(MovieStore);

    if(currentPage && currentPage.length > 0) {
      this.setState({
        page: this.state.page + 1,
        movies: this.state.movies.concat(currentPage),
        loading: false,
      })
    } else if(!this.state.loading) {
      console.log('getMovies loading');
      getPage(MovieActions);
      this.setState({
        loading: true,
      });
    }
  }

  handleTabChange(i) {
    this.setState({
      page: 1,
      index: i,
      movies: [],
      loading: false,
    });
  }

  handleScroll() {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    if (!this.state.loading && (scrollTop + window.innerHeight) >= scrollHeight) {
      this.getMovies();
    }
  }

  render() {
    return (
      <div>
        <div style={{overflowX: 'auto', position: 'fixed', width: '100%', zIndex: 101, marginBottom: '6px'}}>
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
          {
            this.state.loading &&
            <div style={{width: '100%', height: '100px'}}>
              <ProgressBar type='circular' mode='indeterminate' multicolor />
            </div>
          }
        </div>
      </div>
    );
  }
}

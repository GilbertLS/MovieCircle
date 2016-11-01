import React, { Component} from 'react';
import { browserHistory } from 'react-router';

import {
  Tab,
  Tabs,
  ProgressBar,
} from 'react-toolbox';

import {
  MovieGridLogic,
} from '../../components';

import style from './style.scss';

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
    let listName = props.params.listName;

    this.state = {
      index: getIndexFromListName(listName),
      listName: listName || 'popular',
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let listName = nextProps.params.listName;

    if(listName !== this.state.listName) {
      this.setState({
        listName: listName || 'popular',
        index: getIndexFromListName(listName),
      });
    }
  }

  handleTabChange(i) {
    let listName = getListNameFromIndex(i);

    this.setState({
      index: i,
      listName: listName,
    });

    browserHistory.replace('/movies/' + listName);
  }

  render() {
    return (
      <div>
        <div className={style.tabContainer}>
          <div className={style.tabScroll}>
            <Tabs index={this.state.index} onChange={this.handleTabChange} inverse>
              <Tab label='Popular'></Tab>
              <Tab label='Top Rated'></Tab>
              <Tab label='Now Playing'></Tab>
              <Tab label='Upcoming'></Tab>
            </Tabs>
          </div>
        </div>
        <div className={style.gridContainer}>
          <MovieGridLogic listName={this.state.listName} store='movie'/>
        </div>
      </div>
    );
  }
}

const getListNameFromIndex = function(i) {
  switch(i) {
    case 1:
      return 'top_rated';
      break;
    case 2:
      return 'now_playing';
      break;
    case 3:
      return 'upcoming';
      break;
    default:
      return 'popular';
  }
}

const getIndexFromListName = function(listName) {
  switch(listName) {
    case 'top_rated':
      return 1;
      break;
    case 'now_playing':
      return 2;
      break;
    case 'upcoming':
      return 3;
      break;
    default:
      return 0;
  }
}

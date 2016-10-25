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

    this.handleTabChange        = this.handleTabChange.bind(this);
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

    browserHistory.replace('/list/' + listName);
  }

  render() {
    return (
      <div>
        <div className={style.tabContainer}>
          <div className={style.tabScroll}>
            <Tabs index={this.state.index} onChange={this.handleTabChange} inverse>
              <Tab label='Favorites'></Tab>
              <Tab label='Watched'></Tab>
              <Tab label='Watch Later'></Tab>
            </Tabs>
          </div>
        </div>
        <div className={style.gridContainer}>
          <MovieGridLogic listName={this.state.listName} store='list'/>
        </div>
      </div>
    );
  }
}

const getListNameFromIndex = function(i) {
  switch(i) {
    case 1:
      return 'watched';
      break;
    case 2:
      return 'watch_later';
      break;
    default:
      return 'favorites';
  }
}

const getIndexFromListName = function(listName) {
  switch(listName) {
    case 'watched':
      return 1;
      break;
    case 'watch_later':
      return 2;
      break;
    default:
      return 0;
  }
}

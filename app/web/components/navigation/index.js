import React from 'react';
import { browserHistory } from 'react-router';

import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
} from 'react-toolbox';

import style from './style.scss';

const paths = {
  movies: '/',
}

export default class Navigation extends React.Component {
  handleOnClick(path) {
    browserHistory.push(path);
  }

  render() {
    return (
      <nav className={style.container}>
        <List selectable ripple>
          <ListItem caption='Movies' leftIcon='theaters' onClick={() => {this.handleOnClick(paths.movies)}}/>
          <ListDivider />
          <ListSubHeader caption='Your Lists' />
          <ListItem caption='Favorites' leftIcon='favorite' />
          <ListItem caption='Watched' leftIcon='visibility' />
          <ListItem caption='Watch Later' leftIcon='schedule' />
          <ListDivider />
          <ListItem caption='Settings' leftIcon='settings' />
        </List>
      </nav>
    );
  }
}

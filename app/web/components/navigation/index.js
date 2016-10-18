import React from 'react';
import { browserHistory } from 'react-router';

import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  Dialog,
} from 'react-toolbox';

import style from './style.scss';

const paths = {
  movies: '/',
  favorites: '/u/favorites',
  watched: '/u/watched',
  watchLater: '/u/watchlater',
  settings: '/u/settings',
};

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDialogActive: false,
    };

    this.handleAboutOnClick = this.handleAboutOnClick.bind(this);
  }

  handleOnClick(path) {
    browserHistory.push(path);
  }

  handleAboutOnClick() {
    this.setState({
      isDialogActive: !this.state.isDialogActive,
    });
  }

  render() {
    const actions = [
      {
        label: 'Close',
        onClick: this.handleAboutOnClick,
      }
    ];

    return (
      <nav className={style.container}>
        <List selectable ripple>
          <ListItem caption='Movies' leftIcon='theaters' onClick={() => {this.handleOnClick(paths.movies)}}/>
          <ListDivider />
          <ListSubHeader caption='Your Lists' />
          <ListItem caption='Favorites' leftIcon='favorite' onClick={() => {this.handleOnClick(paths.favorites)}/>
          <ListItem caption='Watched' leftIcon='visibility' onClick={() => {this.handleOnClick(paths.watched)}/>
          <ListItem caption='Watch Later' leftIcon='schedule' onClick={() => {this.handleOnClick(paths.watchLater)}/>
          <ListDivider />
          <ListItem caption='Settings' leftIcon='settings' onClick={() => {this.handleOnClick(paths.settings)}/>
          <ListItem caption='About' leftIcon='help' onClick={() => {this.handleAboutOnClick()}}/>
        </List>
        <Dialog
          actions={actions}
          active={this.state.isDialogActive}
          onOverlayClick={() => {this.handleAboutOnClick()}}
          title='About'>
          <div>
            <p>
              MovieCircle is created by Gilbert Lavergne-Shank.
            </p>
            <p>
              The source can be found on my <a href='https://github.com/GilbertLS/MovieCircle'>Github</a>.
            </p>
            <p>
              <img width='100px' src='https://www.themoviedb.org/assets/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'/>
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
          </div>
        </Dialog>
      </nav>
    );
  }
}

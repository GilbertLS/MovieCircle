import React from 'react';
import { browserHistory } from 'react-router';

import FacebookActions from '../../../actions/FacebookActions';
import UserActions from '../../../actions/UserActions';

import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  Dialog,
} from 'react-toolbox';

import style from './style.scss';

const facebookLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNTgwMTE3NDA3MjA2ODExODA4M0NDMTM4MEMyQTVFQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCN0YwMzNGQUE2MTYxMUUyOEJFQUJDRTMzOERDQjM5MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCN0YwMzNGOUE2MTYxMUUyOEJFQUJDRTMzOERDQjM5MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM3QUJGQTkzODIwNjgxMThDMTQ5OEFGOTgxQUJBQ0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDU4MDExNzQwNzIwNjgxMTgwODNDQzEzODBDMkE1RUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VkWTUAAABF0lEQVR42mK0Dp/LyMDAUATEDUDMw0A78AVqRy8L1MIeBtoDHpg9TEDcyEBf0AiylJvOlnIzMQwAYKGK0znZGALdNBgcLRQYFKQFGNjZWBi+//jN8OHzT4bQ3FXUt1RFQZihvdiZQVIUNeFzcrCCMdV9ysPFxtBb4cYgLMBJkj6K4jTSR5dkCyn2qb25PAp//e6bDDOXn2b48u0X7XwqK8GHwp+/9jxBCym2lJkZVfv7j99oH6fo4P9/BvpbSpOEdGRFEknyv//8Y3CJX8Tw9+8/+vn00fOPGBbS3NIHjz/QP04fPP1AeZzaRMzDG4fo8oMq9Y5aOmrp0Lb0K53t/AqytJ3OlraDLG0D4hI6+Pgr1J5WgAADACLKR4SeAF87AAAAAElFTkSuQmCC';

const paths = {
  movies: '/',
  favorites: '/list/favorites',
  watched: '/list/watched',
  watchLater: '/list/watch_later',
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

  handleSignOutOnClick() {
    FacebookActions.logout();
    UserActions.logoutFacebook();
  }

  handleSignInOnClick() {
    FacebookActions.login();
  }

  render() {
    return (
      <nav className={style.container}>
        {
          !!this.props.isLoggedIn &&
          <List selectable ripple>
            <ListItem caption='Movies' leftIcon='theaters' onClick={() => {this.handleOnClick(paths.movies)}}/>
            <ListDivider />
            <ListSubHeader caption='Your Lists' />
            <ListItem caption='Favorites' leftIcon='favorite' onClick={() => {this.handleOnClick(paths.favorites)}}/>
            <ListItem caption='Watched' leftIcon='visibility' onClick={() => {this.handleOnClick(paths.watched)}}/>
            <ListItem caption='Watch Later' leftIcon='schedule' onClick={() => {this.handleOnClick(paths.watchLater)}}/>
            <ListDivider />
            <ListSubHeader caption='Your Account' />
            <ListItem caption='Sign Out' leftIcon='cancel' onClick={() => {this.handleSignOutOnClick()}}/>
            <ListDivider />
            <ListItem caption='About' leftIcon='help' onClick={() => {this.handleAboutOnClick()}}/>
          </List>
        }
        {
          !this.props.isLoggedIn &&
          <List selectable ripple>
            <ListItem
              caption='Sign In With Facebook'
              leftIcon={<img src={facebookLogo}/>}
              onClick={() => {this.handleSignInOnClick()}}/>
            <ListDivider />
            <ListItem caption='Movies' leftIcon='theaters' onClick={() => {this.handleOnClick(paths.movies)}}/>
            <ListDivider />
            <ListItem caption='About' leftIcon='help' onClick={() => {this.handleAboutOnClick()}}/>
          </List>
        }
        <Dialog
          actions={[{label: 'Close', onClick: this.handleAboutOnClick}]}
          active={this.state.isDialogActive}
          onOverlayClick={this.handleAboutOnClick}
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

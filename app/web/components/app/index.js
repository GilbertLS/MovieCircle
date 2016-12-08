import React from 'react';
import { browserHistory } from 'react-router';
import UserStore from '../../../stores/UserStore';

import {
  AppBar,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
  Snackbar,
} from 'react-toolbox';

import {
  Navigation,
  SearchInput,
  LoginComponent,
} from '../../components';

import theme from './theme.scss';
import style from './style.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
      snackbarActive: false,
      isLoggedIn: UserStore.getIsLoggedIn(),
    }

    this.toggleDrawerActive    = this.toggleDrawerActive.bind(this);
    this.handleUserStoreChange = this.handleUserStoreChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this.handleUserStoreChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this.handleUserStoreChange);
  }

  handleUserStoreChange(state) {
    this.setState({
      isLoggedIn: UserStore.getIsLoggedIn(),
      snackbarActive: (!UserStore.getIsLoggedIn() && !!this.state.isLoggedIn),
    });
  }

  toggleDrawerActive() {
    this.setState({drawerActive: !this.state.drawerActive});
  };

  render() {
    return (
      <Layout theme={theme}>
        <NavDrawer
          active={this.state.drawerActive}
          pinned={this.state.drawerPinned}
          permanentAt='lg'
          onOverlayClick={this.toggleDrawerActive}>
          <Navigation isLoggedIn={this.state.isLoggedIn}/>
        </NavDrawer>
        <Panel>
          <AppBar theme={theme}>
            <IconButton
              theme={theme}
              icon='menu'
              inverse={ true }
              onClick={this.toggleDrawerActive}/>
            <SearchInput/>
          </AppBar>
          <div className={style.childContainer}>
          {React.cloneElement(this.props.children, {
            isLoggedIn: this.state.isLoggedIn
          })}
          </div>
          <Snackbar
            active={this.state.snackbarActive}
            action='Dismiss'
            label='You Have Been Logged Out.'
            onClick={() => this.setState({snackbarActive: false})}
            ref='snackbar'
            type='cancel'
            className={style.snackbar}
          />
        </Panel>
      </Layout>
    );
  }
}

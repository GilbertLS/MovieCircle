import React from 'react';
import { browserHistory } from 'react-router';
import FacebookStore from '../../../stores/FacebookStore';
import FacebookActions from '../../../actions/FacebookActions';
import AuthStore from '../../../stores/AuthStore';
import AuthActions from '../../../actions/AuthActions';

import {
  AppBar,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
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
      isLoggedIn: AuthStore.getLoggedIn(),
    }

    this.toggleDrawerActive   = this.toggleDrawerActive.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleAuthChange     = this.handleAuthChange.bind(this);
  }

  componentWillMount() {
    FacebookActions.initFacebook();
  }

  componentDidMount() {
    FacebookStore.listen(this.handleFacebookChange);
    AuthStore.listen(this.handleAuthChange);
  }

  componentWillUnmount() {
    FacebookStore.unlisten(this.handleFacebookChange);
    AuthStore.unlisten(this.handleAuthChange);
  }

  handleFacebookChange(state) {
    const auth = FacebookStore.getAuth();
    if(auth) {
      AuthActions.loginFacebook(auth);
    }
  }

  handleAuthChange(state) {
    console.log(AuthStore.getLoggedIn());
    this.setState({
      isLoggedIn: AuthStore.getLoggedIn()
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
          {this.props.children && React.cloneElement(this.props.children, {
            isLoggedIn: this.state.isLoggedIn
          })}
          </div>
        </Panel>
      </Layout>
    );
  }
}

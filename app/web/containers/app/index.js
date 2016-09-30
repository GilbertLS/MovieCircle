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

import {Navigation} from '../../components';

//Themes
import theme from './theme.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
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
    if(FacebookStore.getLoggedIn()) {
      AuthActions.verifyFacebook(FacebookStore.getAuth());
    }
  }

  handleAuthChange(state) {

  }

  toggleDrawerActive() {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  render() {
    return (
      <Layout theme={theme}>
        <NavDrawer
          active={this.state.drawerActive}
          pinned={this.state.drawerPinned}
          permanentAt='lg'
          onOverlayClick={ this.toggleDrawerActive }>
          <Navigation/>
        </NavDrawer>
        <Panel>
          <AppBar theme={theme}>
            <IconButton icon='menu' inverse={ true } onClick={ this.toggleDrawerActive }/>

          </AppBar>
          <div style={{fontSize: '24px', paddingTop: '6.4rem'}}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    );
  }
}

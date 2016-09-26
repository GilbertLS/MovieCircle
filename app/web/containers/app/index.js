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
  Navigation,
} from 'react-toolbox';

import CustomNavigation from '../../components/Navigation';

//Themes
import appBarTheme from './AppBar.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    }

    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
  }

  componentWillMount() {
    FacebookActions.initFacebook();
  }

  componentDidMount() {
    FacebookStore.listen(this.onFacebookChange);
    AuthStore.listen(this.onAuthChange);
  }

  componentWillUnmount() {
    FacebookStore.unlisten(this.onFacebookChange);
    AuthStore.unlisten(this.onAuthChange);
  }

  onFacebookChange(state) {
    if(FacebookStore.getLoggedIn()) {
      AuthActions.verifyFacebook(FacebookStore.getAuth());
    }
  }

  onAuthChange(state) {

  }

  toggleDrawerActive() {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  render() {
    return (
      <Layout>
        <NavDrawer
          className='customDrawer' //Using this as a hack
          active={this.state.drawerActive}
          pinned={this.state.drawerPinned}
          permanentAt='lg'
          onOverlayClick={ this.toggleDrawerActive }>
          <CustomNavigation/>
        </NavDrawer>
        <Panel>
          <AppBar theme={appBarTheme}>
            <IconButton icon='menu' inverse={ true } onClick={ this.toggleDrawerActive }/>
            <h2>MovieCircle</h2>
            <IconButton icon='search' inverse={ true } onClick={ this.toggleDrawerActive }/>
          </AppBar>
          <div style={{ flex: 1, overflowY: 'auto', fontSize: '24px', zIndex: 100/*, padding: '1.8rem'*/ }}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    );
  }
}

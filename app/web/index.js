/**
 * App entry point
 */

//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import { App } from './components';
import {
  LoginPage,
  MoviesPage,
} from './containers';

//Routes
const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: MoviesPage },
  ]
};

//React Hot Loader
if (module.hot) {
  module.hot.accept();
}

//Render the router
ReactDOM.render((
  <Router history={browserHistory} routes={routes}/>
), document.getElementById('app'));

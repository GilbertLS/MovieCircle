import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { LoginPage, LoadingPage } from '../containers';
import AuthenticatedComponent from './AuthenticatedComponent';
import App from './App';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={LoginPage} />
    <Route path='loading' component={LoadingPage} />
    <Route path='m' component={AuthenticatedComponent} />
  </Route>
);

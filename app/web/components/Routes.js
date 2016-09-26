import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  LoginPage,
  MoviesPage,
} from '../containers';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={LoginPage} />
    <Route path='movies' component={MoviesPage} />
  </Route>
);

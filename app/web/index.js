/**
 * App entry point
 */

//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import {
  App,
  AuthComponent,
} from './components';
import {
  LoginPage,
  MoviesPage,
  MoviePage,
  SearchPage,
  FavoritesPage,
} from './containers';

//Routes
const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: MoviesPage },
    { path: '/movies/:listName', component: MoviesPage },
    { path: '/movie/:id', component: MoviePage },
    { path: '/search/:query', component: SearchPage },
    {
      path: '/list',
      component: AuthComponent,
      childRoutes: [
        { path: '/list/:listName', component: FavoritesPage },
      ]
    },
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

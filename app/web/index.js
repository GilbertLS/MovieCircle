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

//Store Actors
import FacebookStore from '../stores/FacebookStore';
import FacebookActions from '../actions/FacebookActions';
import FacebookActor from '../actors/FacebookActor';

FacebookActions.init(); //Make sure FBJSDK is initialized
//Actor takes care of login/logout
FacebookStore.listen((store) => FacebookActor(store));

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

//Render the router
ReactDOM.render((
  <Router history={browserHistory} routes={routes}/>
), document.getElementById('app'));

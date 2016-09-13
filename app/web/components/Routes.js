import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { LoginPage, HomePage } from '../containers';

const App = ({children}) => {
  return (
    <div id="container">
      {children}
    </div>
  );
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
  </Route>
);

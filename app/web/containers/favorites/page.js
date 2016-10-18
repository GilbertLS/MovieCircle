import React, { Component} from 'react';

import {
  MovieGrid,
  PageLoader,
} from '../../components/';

//import style from './style.scss';

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageLoader/>
    );
  }
}

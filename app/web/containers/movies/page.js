import React, { Component} from 'react';
import { browserHistory } from 'react-router';

import {
  Tab,
  Tabs,
} from 'react-toolbox';

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(i) {
    this.setState({index: i});
  }

  render() {
    return (
      <section>
        <Tabs index={this.state.index} onChange={this.handleTabChange} inverse fixed>
          <Tab label='Popular'><small>First Content</small></Tab>
          <Tab label='Top Rated'><small>Second Content</small></Tab>
          <Tab label='In Theatres'><small>Third Content</small></Tab>
          <Tab label='Latest'><small>Disabled Content</small></Tab>
          <Tab label='Upcoming'><small>Disabled Content</small></Tab>
        </Tabs>
      </section>
    );
  }
}

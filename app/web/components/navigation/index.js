import React from 'react';
import { browserHistory } from 'react-router';

import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  ListCheckbox,
  Button,
} from 'react-toolbox';

export default class Navigation extends React.Component {
  render() {
    return (
      <section>
        <List selectable ripple>
          <ListItem caption='Movies' leftIcon='theaters' />
          <ListDivider />
          <ListSubHeader caption='Your Lists' />
          <ListItem caption='Favorites' leftIcon='favorite' />
          <ListItem caption='Watched' leftIcon='visibility' />
          <ListItem caption='Watch Later' leftIcon='tv' />
          <ListDivider />
          <ListItem caption='Settings' leftIcon='settings' />
        </List>
        <Button label='LOGIN WITH FACEBOOK' raised primary />
      </section>
    );
  }
}

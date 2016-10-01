import React from 'react';
import { browserHistory } from 'react-router';

export default class SearchInput extends React.Component {
  render() {
    return (
      <div style={style.container}>
        <input type='text'/>
      </div>
    );
  }
}

const style = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '2px',
    height: '3.4rem',
    fontSize: '18px',
    padding: '5px 24px',
    justifyContent: 'center'
  },
}

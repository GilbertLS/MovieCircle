import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import style from './style.scss';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    }

    this.handleOnClick    = this.handleOnClick.bind(this);
    this.handleOnBlur     = this.handleOnBlur.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  handleOnClick() {
    this.setState({
      selected: true,
    });
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  handleOnBlur() {
    this.setState({
      selected: false,
    });
  }

  handleOnKeyPress(e) {
    if (e.key === 'Enter') {
      browserHistory.push('/search/' + encodeURIComponent(e.target.value));
    }
  }

  render() {
    return (
      <div className={this.state.selected ? style.containerSelected : style.container}
           onClick={this.handleOnClick}
           onBlur={this.handleOnBlur}>
        <div className={this.state.selected ? style.iconSelected : style.icon}>
          <span className='material-icons' >search</span>
        </div>
        <input className={this.state.selected ? style.inputSelected : style.input}
               onKeyPress={this.handleOnKeyPress}
               onChange={this.handleOnChange}
               ref='input'
               type='text'
               placeholder='Search for movies by title'/>
      </div>
    );
  }
}

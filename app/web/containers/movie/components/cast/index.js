import React, { Component} from 'react';

import {
  Card,
  Avatar,
  Button,
} from 'react-toolbox';

import style from './style.scss';

export default class Cast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleRows: 4,
    };

    this.handleOnMoreClick = this.handleOnMoreClick.bind(this);
  }

  handleOnMoreClick() {
    this.setState({
      visibleRows: this.state.visibleRows + 4,
    });
  }

  renderCastRows() {
    const cast = this.props.cast;
    let rows = [];

    for(let i = 0; i < cast.length && i < this.state.visibleRows; i++) {
      const member = cast[i];
      let rowStyles = style.row;

      if(i%2 != 0) {
        rowStyles = style.row + ' ' + style.even;
      }

      rows.push(
        <div className={rowStyles} key={member.credit_id}>
          <div className={style.avatar}>
          {
            !!member.profile_path &&
            <img src={'https://image.tmdb.org/t/p/w92/' + member.profile_path}/>
          }
          </div>
          <div className={style.name}>{member.name}</div>
          <div className={style.character}> as {member.character}</div>
        </div>
      )
    }

    return rows
  }

  render() {
    const cast = this.props.cast;
    const rows = this.renderCastRows();
    return(
      !!cast && cast.length > 0 &&
      <div className={style.container}>
        {rows}
        {
          (this.state.visibleRows < cast.length) &&
          <Button
            className={style.button}
            onClick={this.handleOnMoreClick}
            label='More'
            raised
            primary/>
        }
      </div>
    );
  }
}

Cast.propTypes = {
  cast: React.PropTypes.array.isRequired,
};

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Menu,
  Button,
} from 'react-toolbox';

import style from './style.scss';

export default class ButtonMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
  }

  handleOnClick() {
    this.setState({
      active: true,
    });
  }

  handleMenuHide() {
    this.setState({
      active: false,
    });
  }

  render() {
    return (
      <div className={style.container}>
        <Button
          icon='add'
          floating accent
          onClick={this.handleOnClick}/>
          <Menu
            ref='menu'
            active={this.state.active}
            onHide={this.handleMenuHide}
            onSelect={this.props.onSelect}
            onShow={this.props.onShow}
            position={this.props.position}
            ripple={this.props.menuRipple}
            selectable={this.props.selectable}
            selected={this.props.selected}>
            {this.props.children}
          </Menu>
      </div>
    );
  }
}

ButtonMenu.defaultProps = {
  menuRipple: true,
  position: 'topRight',
  selectable: false
};

ButtonMenu.propTypes = {
  onSelect: React.PropTypes.func,
  onShow: React.PropTypes.func,
  position: React.PropTypes.string,
  menuRipple: React.PropTypes.bool,
  selectable: React.PropTypes.bool,
  selected: React.PropTypes.any,
};

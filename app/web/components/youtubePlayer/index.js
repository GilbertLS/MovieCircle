import React from 'react';

import {
  Dialog,
} from 'react-toolbox';

import style from './style.scss';
export default class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  handleToggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const actions = [
      {label: 'Close', onClick: this.handleToggle},
    ]

    return (
      !!this.props.youtubeKey && !!this.state.visible &&
      <Dialog active={this.state.visible}
              onOverlayClick={this.handleToggle}
              actions={actions}>
          <iframe width='420' height='315' src={'https://www.youtube.com/embed/' + this.props.youtubeKey}></iframe>
      </Dialog>
    );
  }
}

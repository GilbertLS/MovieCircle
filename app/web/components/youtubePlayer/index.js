import React from 'react';

import style from './style.scss';

export default class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      !!this.props.youtubeKey && !!this.props.visible &&
      <div className={style.overlay}>
          <iframe width='420' height='315' src={'https://www.youtube.com/embed/' + this.props.youtubeKey}></iframe>
      </div>
    );
  }
}

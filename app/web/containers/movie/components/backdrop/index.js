import React, { Component} from 'react';

import style from './style.scss';

export default class Backdrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };

    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  //We load the backdrop with a hidden image
  //Then we show the backdrop when loaded
  handleOnLoad() {
    this.setState({
      loaded: true,
    });
  }

  render() {
    const backgroundClasses = (!!this.state.loaded) ? style.background +' '+ style.loaded : style.background;

    return (
      <div className={style.backdrop}>
        <div
          className={backgroundClasses}
          style={{
            background: 'url(http://image.tmdb.org/t/p/w1280/' + this.props.backdropPath + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}>
        </div>
        <div className={style.backdropContainer}>
          {this.props.children}
        </div>
        {
          !this.state.loaded &&
          <img
            className={style.hidden}
            src={'http://image.tmdb.org/t/p/w1280/' + this.props.backdropPath}
            onLoad={this.handleOnLoad}/>
        }
      </div>
    );
  }
}

Backdrop.propTypes = {
  backdropPath: React.PropTypes.string,
};

import React from 'react';
import { browserHistory } from 'react-router';
import { MoviePoster } from '..';

export default class MovieGrid extends React.Component {
  handleOnClick(id) {
    browserHistory.push('/movie/' + id);
  }

  render() {

    return (
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          this.props.movies &&
          this.props.movies.map((movie) => {
            return (
              <MoviePoster percent={-200} key={movie.id} movie={movie}/>
            )
          })
        }
      </div>
    );
  }
}

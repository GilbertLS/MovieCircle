import React from 'react';

export default class MovieGrid extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.movies.map((movie) => {
            return (<img src={'https://image.tmdb.org/t/p/w185/' + movie.poster_path} key={movie.id}></img>);
          })
        }
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

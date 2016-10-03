import React, { Component} from 'react';
import MovieInfoStore from '../../../stores/MovieInfoStore';
import MovieInfoActions from '../../../actions/MovieInfoActions';

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,//MovieInfoStore.getMovie(props.params.id),
    }

    this.handleMovieInfoStoreChange = this.handleMovieInfoStoreChange.bind(this);
  }

  componentDidMount() {
    MovieInfoStore.listen(this.handleMovieInfoStoreChange);
    //if(!this.state.movie)
      //MovieInfoActions.getMovie(this.props.params.id);
  }

  componentWillUnmount() {
    MovieInfoStore.unlisten(this.handleMovieInfoStoreChange);
  }

  handleMovieInfoStoreChange() {

  }

  render() {
    return (
      <div>
        Movie ID: {this.props.params.id}
      </div>
    );
  }
}

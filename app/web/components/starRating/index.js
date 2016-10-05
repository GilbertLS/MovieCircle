import React from 'react';

//import style from './style.scss';

export default class StarRating extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stars = [];

    if(this.props.rating) {
      let index = 0;
      const rating = this.props.rating/2;

      //Add a star for every point
      while(index < rating) {
        stars.push(<span key={'star' + index} className='material-icons'>grade</span>);
        index++;
      }

      //Half star if rating has .5 or more
      if(rating - index >= 0.5) {
        stars.push(
          <span style={{width: '1rem', overflow: 'hidden'}} key={'star0.5'} className='material-icons'>grade</span>
        );
      }
    }

    return (
      <div>
        {
          this.props.rating &&
          stars
        }
      </div>
    );
  }
}

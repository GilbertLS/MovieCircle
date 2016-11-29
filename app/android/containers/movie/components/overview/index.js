import React, { Component } from 'react';
import { ActionButton } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Linking,
} from 'react-native';

export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.renderStars = this.renderStars.bind(this);
  }

  renderStars(fiveRating) {
    const movie = this.props.movie;
    let stars = [];

    if(movie.vote_average) {
      let index = 0;
      const rating = this.props.movie.vote_average/2;

      //Add a star for every point
      while(index < Math.floor(rating)) {
        stars.push(<Icon key={index} style={styles.star} name={'grade'}/>);
        index++;
      }

      //Half star if rating has .5 or more
      if(rating - index >= 0.5) {
        stars.push(<Icon key={index} style={[styles.star, styles.half]} name={'grade'}/>);
        index++;
      }
    }

    return stars;
  }

  render() {
    const movie = this.props.movie;
    const backdrop_path = this.props.backdrop_path || movie.backdrop_path;

    return (
      <ScrollView>
        {
          !!movie && !!backdrop_path &&
          <View>
            <Image
              style={styles.backdrop}
              source={{ uri: 'http://image.tmdb.org/t/p/w780' + backdrop_path}}
            >
              {
                !!movie && !!movie.videos && movie.videos.results.length > 0 &&
                <ActionButton
                  icon='play-arrow'
                  style={{container: {backgroundColor: 'rgba(0,0,0,0.6)'}}}
                  onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + movie.videos.results[0].key)}
                />
              }
            </Image>
          </View>
        }
        {
          !!movie && !!movie.vote_average &&
          <View style={styles.container}>
            <View style={styles.stars}>{this.renderStars()}</View>
          </View>
        }
        <View style={styles.container}>
          {
            !!movie && !!movie.tagline &&
            <Text style={styles.tagline}>{movie.tagline}</Text>
          }
          {
            !!movie && !!movie.overview &&
            <Text style={styles.overview}>{movie.overview}</Text>
          }
        </View>
        <View style={styles.container}>
          <Text style={styles.tagline}>Title:</Text>
          <Text style={styles.overview}>{movie.title}</Text>
        </View>
        {
          !!movie &&
          <View style={styles.container}>
            <Text style={styles.tagline}>Release Date:</Text>
            <Text style={styles.overview}>{movie.release_date}</Text>
          </View>
        }
        {
          !!movie &&
          <View style={styles.container}>
            <Text style={styles.tagline}>Genres:</Text>
            {
              !!movie.genres && movie.genres.length > 0 &&
              <Text style={styles.overview}>
                {
                  movie.genres.map((genre) => {
                    return genre.name;
                  }).join(', ')
                }
              </Text>
            }
          </View>
        }
        {
          !!movie &&
          <View style={styles.container}>
            <Text style={styles.tagline}>Runtime:</Text>
            <Text style={styles.overview}>{movie.runtime} minutes</Text>
          </View>
        }
      </ScrollView>
    );
  }
}

Overview.propTypes = {
  movie: React.PropTypes.object.isRequired,
  backdrop_path: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 6,
  },
  overview: {
    color: 'white',
    fontSize: 14
  },
  backdrop: {
    height: 200,
    alignItems: 'center',
  },
  trailer: {
    color: 'white',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 40,
    color: 'white',
  },
  half: {
    width: 20,
  },
});

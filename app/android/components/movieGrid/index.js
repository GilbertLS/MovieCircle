import React, { Component } from 'react';
import FitImage from 'react-native-fit-image';

import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';

import {
  MoviePoster,
} from '../';

export default class MovieGrid extends React.Component {
  constructor(props) {
    super(props);

    const rows = createRows(props.movies);

    this.state = {
      dataSource: ds.cloneWithRows(rows),
    };

    this.handleOnEndReached = this.handleOnEndReached.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.movies === nextProps.movies)
      return;

    const rows = createRows(nextProps.movies);
    this.setState({
      dataSource: ds.cloneWithRows(rows),
    });
  }

  handleOnEndReached() {
    if(!!this.props.onEndReached) {
      this.props.onEndReached()
    }
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(array) => {
          return (
            <View style={styles.row}>
              {
                array.map((movie) => {
                  return (
                    <MoviePoster movie={movie} key={movie.id}/>
                  )
                })
              }
              {
                array.length == 1 &&
                <View style={{flex: 0.5}}></View>
              }
            </View>
          )
        }}
        style={styles.container}
        onEndReached={this.handleOnEndReached}
      />
    );
  }
};

MovieGrid.propTypes = {
  movies: React.PropTypes.array.isRequired,
  onEndReached: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 3,
  },
});

const createRows = function(movies) {
  if(!movies) {
    return [];
  }

  let i,j;
  let rows = [];
  let chunk = 2;
  for (i = 0, j = movies.length; i<j; i+=chunk) {
      let temparray = movies.slice(i,i+chunk);
      rows.push(temparray);
  }

  return rows;
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

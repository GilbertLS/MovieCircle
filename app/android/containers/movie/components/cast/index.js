import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
} from 'react-native';

export default class Cast extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { dataSource: ds.cloneWithRows(props.cast), };
  }

  render() {
    const cast = this.props.cast;

    let i = 0;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(member) => {
          let rowStyles = [styles.row];

          if(i++%2!==0)
            rowStyles.push({backgroundColor: 'rgb(51, 51, 51)'});

          return (
            <View style={rowStyles} key={member.credit_id}>
              <View>
              {
                !!member.profile_path &&
                <Image
                  source={{ uri: 'https://image.tmdb.org/t/p/w92/' + member.profile_path}}
                  style={styles.portrait}
                />
              }
              </View>
              <View style={styles.rowName}>
                <Text style={styles.rowText}>{member.name}</Text>
              </View>
              <View style={styles.rowCharacter}>
                <Text style={styles.rowText}>as {member.character}</Text>
              </View>
            </View>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  portrait: {
    width: 60,
    height: 80,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  rowName: {
    flex: 1,
    marginLeft: 20,
  },
  rowCharacter: {
    flex: 1,
  },
  rowText: {
    fontSize: 14,
    color: 'white'
  }
});

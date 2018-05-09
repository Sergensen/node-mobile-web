import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';

export default class Feed extends Component {
  render() {
    return (
      <View style={styles.main}>
          <Text style={styles.text}>
            Feed
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 30
  }
});

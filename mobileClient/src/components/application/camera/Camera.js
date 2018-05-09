import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';

export default class Camera extends Component {
  render() {
    return (
      <View style={styles.main}>
          <Text style={styles.text}>
            Camera
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

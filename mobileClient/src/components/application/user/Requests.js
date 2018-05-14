import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Auth from '../../../modules/Auth';

export default class Requests extends Component {
  render() {
    return (
      <View style={styles.main}>
          <Text style={styles.text}>
            Requests
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

import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Auth from '../../../modules/Auth';

export default class Friends extends Component {
  render() {
    return (
      <View style={styles.main}>
          <Text style={styles.text}>
            Friends
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

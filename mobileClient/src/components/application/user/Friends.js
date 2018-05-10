import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Auth from '../../../modules/Auth';
import axios from 'axios';
const URL = "http://192.168.178.77:3000/";

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

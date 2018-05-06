import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text  } from 'react-native';

export default class Test extends Component {
  onPress(){

  }
  render() {
    const { user, style } = this.props;
    return (
      <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
        <Text style={styles.text}>
        "haalo"
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30
  }
});

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Test from './Test'

export default class Main extends Component {
  render() {
    const { actions, user } = this.props;
    return (
      <View style={styles.mainView}>
        <StatusBar hidden />
        <Test onPress={3} style={styles.test} actions={actions} user={user} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  test: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center"
  }
});

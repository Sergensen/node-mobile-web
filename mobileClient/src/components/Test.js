import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import Auth from '../modules/Auth';

export default class Test extends Component {
  onPress(){
    const { actions } = this.props;
    actions.test();
  }
  logout(){
    Auth.deauthenticateUser();
    this.props.toggleAuthenticateStatus();
  }
  render() {
    const { user, style } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity style={style} onPress={this.onPress.bind(this)}>
          <Text style={styles.text}>
            {user.test}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style} onPress={this.logout.bind(this)}>
          <Text style={styles.text}>
          Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30
  }
});

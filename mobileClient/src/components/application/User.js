import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import Auth from '../../modules/Auth';

export default class App extends Component {
  onPress(){
    const { actions } = this.props;
    actions.test();
  }
  logout(){
    Auth.deauthenticateUser();
    this.props.toggleAuthenticateStatus();
  }
  render() {
    const { user } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this)}>
          <Text style={styles.text}>
            {user.test}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.logout.bind(this)}>
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
    color: "blue",
    fontSize: 30
  },
  button:{
    justifyContent: "center",
    flex: 1
  },
  wrapper:{
    alignItems: "center",
    flex: 1
  }
});

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Test from './Test'
import Auth from '../modules/Auth';
import Login from './Login';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    Auth.isUserAuthenticated().then(async (response) =>{
      this.setState({ authenticated: response })
    });
  }

  render() {
    const { actions, user } = this.props;
    return (
      <View style={styles.mainView}>
        <StatusBar hidden />
        {!this.state.authenticated ? (
          <Login toggleAuthenticateStatus={this.toggleAuthenticateStatus.bind(this)} />
        ) : (
          <Test onPress={3} style={styles.test} actions={actions} user={user} />
        )}
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

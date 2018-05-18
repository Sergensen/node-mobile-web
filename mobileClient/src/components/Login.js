import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import Auth from '../modules/Auth';
import url from '../constants/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "user01",
      email: "user01@example.com",
      password: "password",
      signup: false
    };
  }

  toggleSignUp() {
    this.setState((prevState, props) => {
      return { signup: !prevState.signup };
    });
  }

  success(res) {
    Auth.authenticateUser(res.data.user).then(async response => {
      this.props.toggleAuthenticateStatus();
    });
  }

  sendRequest(path) {
    const { email, password, name } = this.state;
    return axios({
      method: "POST",
      url: url + '/auth' + path,
      data: "email=" + email + "&password=" + password + "&name=" + name,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  login() {
    this.sendRequest("/login")
      .then(response => this.success(response))
      .catch(alert);
  }

  signup() {
    this.sendRequest("/signup")
      .then(this.login)
      .catch(alert);
  }

  render() {
    const { user } = this.props;
    const { signup } = this.state;
    const loginBtn = !signup ? (
      <TouchableOpacity style={styles.input} onPress={this.login.bind(this)}>
        <Text style={styles.btn}>Login</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.input} onPress={this.signup.bind(this)}>
          <Text style={styles.btn}>Signup</Text>
        </TouchableOpacity>
      );
    const signupBtn = !signup ? (
      <TouchableOpacity
        style={styles.input}
        onPress={this.toggleSignUp.bind(this)}
      >
        <Text style={styles.btn}>Or signup</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={this.toggleSignUp.bind(this)}
        >
          <Text style={styles.btn}>Back</Text>
        </TouchableOpacity>
      );
    const userName = signup ? (
      <TextInput
        style={styles.text}
        placeholder=" type name"
        onChangeText={name => this.setState({ name })}
        value={this.state.name}
      />
    ) : (
        ""
      );

    return (
      <View>
        <Text>{userName}</Text>
        <TextInput
          style={styles.text}
          placeholder=" type email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.text}
          placeholder=" type password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <View>
          {loginBtn}
          {signupBtn}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#C2C2C2",
    color: "#000000",
    fontSize: 20,
    height: 60,
    justifyContent: "center"
  },
  input: {
    alignItems: "center",
    backgroundColor: "#CCCCCC",
    height: 60,
    justifyContent: "center"
  },
  btn: {
    color: "white",
    fontSize: 30
  }
});

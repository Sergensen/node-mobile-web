import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from "react-native";
import Auth from "../modules/Auth";

const API_IP = "192.168.178.36";
const AUTH_API = "http://" + AUTH_API + ":3000/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
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
      url: AUTH_API + path,
      data: "email=" + email + "&password=" + password + "&name=" + name,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  login() {
    sendRequest("/login")
      .then(this.success)
      .catch(alert);
  }

  signup() {
    sendRequest("/signup")
      .then(this.login)
      .catch(alert);
  }

  render() {
    const { user } = this.props;
    const { signup } = this.state;
    const login = !signup ? (
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
      "No user"
    );

    return (
      <View style={styles.main}>
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
        <View>{login}</View>
        <View>{signupBtn}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#C2C2C2",
    fontSize: 20,
    height: 60,
    justifyContent: "center"
  },
  input: {
    alignItems: "center",
    backgroundColor: "#B4B4B4",
    height: 60,
    justifyContent: "center"
  },
  btn: {
    color: "white",
    fontSize: 30
  },
  main: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center"
  }
});

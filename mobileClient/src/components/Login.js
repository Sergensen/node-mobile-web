import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import Auth from '../modules/Auth';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      email: '',
      password: '',
      signup: false
    }
  }
  toggleSignUp(){
    this.setState((prevState, props) => {
      return {signup: !prevState.signup}
    });
  }
  login() {
    const { email, password, name } = this.state;
    axios({
      method: 'post',
      url: 'http://10.17.7.173:3000/auth/login',
      data: "email="+email+"&password="+password+"&name="+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => this.success(res))
    .catch((error) => alert(error));
  }
  success(res){
    Auth.authenticateUser(res.data.user).then(async (response) => {
      this.props.toggleAuthenticateStatus();
    });
  }
  signup(){
    const { email, password, name } = this.state;
    axios({
      method: 'post',
      url: 'http://10.17.7.173:3000/auth/signup',
      data: "email="+email+"&password="+password+"&name="+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => this.login())
    .catch((error) => alert(error));
  }
  render() {
    const { user } = this.props;
    const { signup } = this.state;
    const login = !signup?(
      <TouchableOpacity style={styles.input} onPress={this.login.bind(this)}>
        <Text style={styles.btn}>
        Login
        </Text>
      </TouchableOpacity>
    ):(
      <TouchableOpacity style={styles.input} onPress={this.signup.bind(this)}>
        <Text style={styles.btn}>
        Signup
        </Text>
      </TouchableOpacity>
    );
    const signupBtn = !signup?(
      <TouchableOpacity style={styles.input} onPress={this.toggleSignUp.bind(this)}>
        <Text style={styles.btn}>
        Or signup
        </Text>
      </TouchableOpacity>
    ):(
      <TouchableOpacity style={styles.input} onPress={this.toggleSignUp.bind(this)}>
        <Text style={styles.btn}>
        Back
        </Text>
      </TouchableOpacity>
    );
    const userName = signup?(
        <TextInput
        style={styles.text}
          placeholder=" type name"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />):"";
    return (
      <View style={styles.main}>
        {userName}
        <TextInput
        style={styles.text}
          placeholder=" type email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.text}
          placeholder=" type password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />
        {login}
        {signupBtn}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    height: 60,
    fontSize: 20,
    backgroundColor: "#C2C2C2",
    justifyContent: "center"
  },
  input: {
    height: 60,
    backgroundColor: "#B4B4B4",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    fontSize: 30,
    color: "white"
  },
  main: {
    justifyContent: "center",
    backgroundColor: "white"
  }
});

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
      error: ''
    }
  }
  login() {
    const { email, password, name } = this.state;
    axios({
      method: 'post',
      url: 'http://192.168.178.77:3000/auth/login',
      data: "email="+email+"&password="+password+"&name="+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => this.success(res))
    .catch((error) => this.setState({error}));
  }
  success(res){
    this.setState({error:''});
    Auth.authenticateUser(res.data.user).then(async (response) => {
      this.props.toggleAuthenticateStatus();
    });
  }
  signup(){
    const { email, password, name } = this.state;
    axios({
      method: 'post',
      url: 'http://192.168.178.77:3000/auth/signup',
      data: "email="+email+"&password="+password+"&name="+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res) => this.success(res))
    .catch((error) => this.setState({error}));
  }
  render() {
    const { user, style } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity style={style} onPress={this.login.bind(this)}>
          <Text style={styles.text}>
          Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={style} onPress={this.signup.bind(this)}>
          <Text style={styles.text}>
          Signup
          </Text>
        </TouchableOpacity>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="type name"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="type email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="type password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
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

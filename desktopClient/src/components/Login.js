import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      name: '',
      password: ''
    };
  }
  onChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    const { email, password, name } = this.state;
    return (
      <div>
        <input id="email" onChange={this.onChange.bind(this)} type="email" placeholder="Type email..." value={email} />
        <input id="password" onChange={this.onChange.bind(this)} type="password" placeholder="Type password..." value={password} />
        <input id="name" onChange={this.onChange.bind(this)} type="text" placeholder="Type name..." value={name} />
        <input id="login" onClick={this.login.bind(this)} type="button" value="login" />
        <input id="signup" onClick={this.login.bind(this)} type="button" value="sign up" />
      </div>
    );
  }
  login(e) {
    const { email, password, name } = this.state;
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth/'+e.target.id,
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
    Auth.authenticateUser(res.data.user);
    this.props.toggleAuthenticateStatus()
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../modules/Auth';
import { auth } from '../../modules/Api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: ''
    };
  }
  onChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input id="login" onClick={this.login.bind(this)} type="button" value="login" />
        <input id="email" onChange={this.onChange.bind(this)} type="email" placeholder="Type email..." value={email} />
        <input id="password" onChange={this.onChange.bind(this)} type="password" placeholder="Type password..." value={password} />
      </div>
    );
  }
  login(e) {
    const { email, password } = this.state;
    auth("login", this.handleLogin, email, password);
  }
  handleLogin(feedback){
    const { error, res} = feedback;
    if(error) this.setState({error});
    if(!error) this.success(res);
  }
  success(res){
    this.setState({error:''});
    Auth.authenticateUser(res.data.user);
    this.props.history.replace("/");
  }
}

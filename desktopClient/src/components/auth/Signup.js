import React, { Component } from 'react';
import { auth } from '../../modules/Api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      name: '',
      surname: '',
      username: '',
      password: ''
    };
  }
  onChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  render() {
    const { email, password, name, surname, username } = this.state;
    return (
      <div>
        <input id="signup" onClick={this.signup.bind(this)} type="button" value="sign up" />
        <input id="email" onChange={this.onChange.bind(this)} type="email" placeholder="Type email..." value={email} />
        <input id="username" onChange={this.onChange.bind(this)} type="text" placeholder="Type username..." value={username} />
        <input id="name" onChange={this.onChange.bind(this)} type="text" placeholder="Type name..." value={name} />
        <input id="surname" onChange={this.onChange.bind(this)} type="text" placeholder="Type surname..." value={surname} />
        <input id="password" onChange={this.onChange.bind(this)} type="password" placeholder="Type password..." value={password} />
      </div>
    );
  }
  signup(e) {
    const { email, name, username, surname, password } = this.state;
    auth("signup", this.handleLogin, email, password, name, surname, username);
  }
  handleLogin(feedback){
    const { error, res} = feedback;
    if(error) this.setState({error});
    if(!error) this.success(res);
  }
  success(res){
    console.log(res.data);
    this.setState({error:''});
    Auth.authenticateUser(res.data.user);
    this.props.history.replace("/");
  }
}

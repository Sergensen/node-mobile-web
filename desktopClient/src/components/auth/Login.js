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
    const { email, password, error } = this.state;
    return (
      <div style={error?{border:"1px solid red"}:{}}>
        <p style={styles.error}>{error}</p>
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="email" onChange={this.onChange.bind(this)} type="email" placeholder="Type email..." value={email} />
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="password" onChange={this.onChange.bind(this)} type="password" placeholder="Type password..." value={password} />
        <input style={styles.button} id="login" onClick={this.login.bind(this)} type="button" value="Login" />
      </div>
    );
  }
  onKeyUp(e){
    if(e.key==="Enter") this.login();
  }
  login(e) {
    const { email, password } = this.state;
    auth("login", this.handleLogin.bind(this), email, password);
  }
  handleLogin(feedback){
    const { error, res} = feedback;
    if(error) this.setState({error: "User not exists!"});
    if(!error) this.success(res);
  }
  success(res){
    this.setState({error:''});
    Auth.authenticateUser(res.data.user);
    this.props.history.replace("/");
  }
}

const styles = {
  input: {
    width: "100%",
    border: "1px solid grey",
    boxSizing: "border-box",
    height: "50px",
    backgroundColor: "white"
  },
  error: {
    width: "100%",
    color: "red",
    fontFamily: "arial",
    textAlign: "center"
  },
  button: {
    width: "100%",
    height: "50px",
    backgroundColor: "white",
    border: "1px solid grey"
  }
}

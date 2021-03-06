import React, { Component } from 'react';
import { auth } from '../../modules/Api';
import Auth from '../../modules/Auth';

export default class Signup extends Component {
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
    const { email, password, name, surname, username, error } = this.state;
    return (
      <div style={error?{border:"1px solid red"}:{}}>
        <p style={styles.error}>{error}</p>
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="email" onChange={this.onChange.bind(this)} type="email" placeholder="Type email..." value={email} />
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="username" onChange={this.onChange.bind(this)} type="text" placeholder="Type username..." value={username} />
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="name" onChange={this.onChange.bind(this)} type="text" placeholder="Type name..." value={name} />
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="surname" onChange={this.onChange.bind(this)} type="text" placeholder="Type surname..." value={surname} />
        <input onKeyUp={this.onKeyUp.bind(this)} style={styles.input} id="password" onChange={this.onChange.bind(this)} type="password" placeholder="Type password..." value={password} />
        <input style={styles.button} id="signup" onClick={this.signup.bind(this)} type="button" value="Create account!" />
      </div>
    );
  }
  onKeyUp(e){
    if(e.key==="Enter") this.signup();
  }
  signup(e) {
    const { email, name, username, surname, password } = this.state;
    if(email&&name&&username&&surname&&password) auth("signup", this.handleLogin.bind(this), email, password, name, surname, username);
  }
  handleLogin(feedback){
    const { error, res} = feedback;
    if(error) this.setState({error:"Check your data!"});
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

import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false
    };
  }
  toggleSignUp(e){
    this.setState((prevState, props) => {
      return {signup: !prevState.signup}
    });
  }
  render() {
    const { signup } = this.state;
    const component = !signup?<Login history={this.props.history} />:<Signup history={this.props.history} />;

    return (
      <div style={styles.wrapper}>
        {component}
        <button style={styles.toggleSignUp} onClick={this.toggleSignUp.bind(this)}>{"..or "+(!signup?"signup":"login")}</button>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px"
  },
  toggleSignUp: {
    width: "100%"
  }
}

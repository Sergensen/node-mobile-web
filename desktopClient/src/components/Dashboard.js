import React, { Component } from 'react';
import Auth from '../modules/Auth';

export default class Dashboard extends Component {
  logout(){
    Auth.deauthenticateUser();
    this.props.toggleAuthenticateStatus();
  }
  render() {
    return (
      <div>
        You logged in!
        <br />
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
}

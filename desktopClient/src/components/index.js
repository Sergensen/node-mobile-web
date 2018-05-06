import React, { Component } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Auth from '../modules/Auth';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
      <div>
        {!this.state.authenticated ? (
          <Login toggleAuthenticateStatus={this.toggleAuthenticateStatus.bind(this)} />
        ) : (
          <Dashboard toggleAuthenticateStatus={this.toggleAuthenticateStatus.bind(this)} />
        )}
      </div>
    );
  }
}

export default Main;

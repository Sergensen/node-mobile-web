import React, { Component } from 'react';
import AuthForm from '../components/auth/Auth';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { reduxForm } from 'redux-form';
import Auth from '../modules/Auth';

class Authenticate extends Component {
  componentDidMount() {
    if(Auth.isUserAuthenticated()) this.props.history.replace("/");
  }

  render() {
    const { user, setUser, history } = this.props;
    return <AuthForm user={user} history={history} setUser={setUser} />;
  }
}

let form = reduxForm({
  form: 'DastM'
})(Authenticate);

form = connect((state, ownProps) => ({
    user: state.user
  }), actions
)(form);

export default form;

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Main from '../components/Main';

const App = ({actions, user}) => (
    <Main actions={actions} user={user} />
  );

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

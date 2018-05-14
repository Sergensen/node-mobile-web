import React, { Component } from 'react';
import { StyleSheet, ScrollView , View  } from 'react-native';
import Auth from '../../../modules/Auth';
import Search from './Search';
import Requests from './Requests';
import Friends from './Friends';

export default class App extends Component {
  onPress(){
    const { actions } = this.props;
    actions.test();
  }
  logout(){
    Auth.deauthenticateUser();
    this.props.toggleAuthenticateStatus();
  }
  render() {
    const { user, actions } = this.props;
    const { friends, inRequests, outRequests } = user;
    return (
      <ScrollView style={styles.wrapper}>
        <Search outRequests={outRequests} user={user} />
        <Requests inRequests={inRequests} />
        <Friends friends={friends} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
  }
});

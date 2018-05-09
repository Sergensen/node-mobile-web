import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import Auth from '../../modules/Auth';
import User from './user/User';
import Camera from './camera/Camera';
import Feed from './feed/Feed';
import Swiper from 'react-native-swiper';

export default class App extends Component {
  render() {
    const { user, toggleAuthenticateStatus, actions } = this.props;
    return (
      <Swiper index={1} showsButtons={false} loop={false} showsPagination={false}>
        <Feed />
        <Camera />
        <User actions={actions} toggleAuthenticateStatus={toggleAuthenticateStatus} user={user} />
      </Swiper>
    );
  }
}

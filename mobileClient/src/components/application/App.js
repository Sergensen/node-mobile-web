import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import Auth from '../../modules/Auth';
import User from './User';
import Camera from './Camera';
import Feed from './Feed';
import Swiper from 'react-native-swiper';

export default class App extends Component {
  render() {
    const { user, toggleAuthenticateStatus } = this.props;
    return (
      <Swiper index={1} showsButtons={false} loop={false} showsPagination={false}>
        <Feed />
        <Camera />
        <User toggleAuthenticateStatus={toggleAuthenticateStatus} user={user} />
      </Swiper>
    );
  }
}

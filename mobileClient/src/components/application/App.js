import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, Text, View  } from 'react-native';
import Auth from '../../modules/Auth';
import User from './user/User';
import Camera from './camera/Camera';
import Feed from './feed/Feed';
import Swiper from 'react-native-swiper';
import url from '../../constants/config';

export default class App extends Component {
  componentDidMount(){
    Auth.getToken().then((response)=>{
      axios({
        method: 'post',
        url: url+'/api/userself/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer ' + response
        }
      }).then((res)=>{
        this.props.actions.setUser(res.data.message);
      }).catch((err)=>{alert(err)});
    });
  }
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

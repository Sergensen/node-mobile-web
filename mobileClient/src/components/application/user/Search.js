import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import UserList from './UserList';
import Auth from '../../../modules/Auth';
import axios from 'axios';
import url from '../../../constants/config';

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      name: "",
      users: []
    }
  }
  getUsers(){
    Auth.getToken().then((response)=>{
      axios({
        method: 'get',
        url: url+'/api/user/'+this.state.name,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer ' + response
        }
      })
      .then((res) => {
        this.setState({users: res.data.message});
      })
      .catch((error) => alert(error));
    });
  }
  render() {
    const { users } = this.state;
    const { outRequests } = this.props;
    return (
      <View style={styles.main}>
          <TextInput
            placeholder="Search users..."
            style={styles.text}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <TouchableOpacity style={styles.input} onPress={this.getUsers.bind(this)}>
            <Text style={styles.btn}>
            Search
            </Text>
          </TouchableOpacity>
          <UserList outRequests={outRequests} users={users} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 30,
    height: 60
  },
  input: {
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    height: 60,
    fontSize: 20,
    justifyContent: "center"
  },
  main: {
    flex: 1
  }
});

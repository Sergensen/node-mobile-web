import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Auth from '../../../modules/Auth';
import url from '../../../constants/config';
import parse from 'jwt-decode';

export default class ListElement extends Component {
  render() {
    const { _id, name, email } = this.props.user;
    return (
      <View key={Math.random()} style={styles.list}>
        <Text style={styles.element}>
        {name}
        </Text>
        <Text style={styles.element}>
        {email}
        </Text>
        <TouchableOpacity id={_id} style={styles.button} onPress={this.addUser.bind(this)}>
          <Text style={styles.element}>
          {"Add " + name+"!"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  addUser(){
    const { _id } = this.props.user;
    const data="from="+parse(Auth.getToken()).sub+"&to="+_id;
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/add/',
      data,
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => alert(res))
    .catch((error) => alert(error));
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey"
  },
  button: {
    flex: 1,
    backgroundColor: "red"
  },
  element: {
    flex: 1,
    fontSize: 15
  }
});

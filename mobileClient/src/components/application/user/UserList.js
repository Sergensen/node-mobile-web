import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import ListElement from './ListElement';

export default class UserList extends Component {
  getListElements(){
    const { users } = this.props;
    let out = {};
    for(let key in users) out[users[key]._id]=(<ListElement key={Math.random()} user={user[key]} />);
    return out;
  }
  render() {
    let out = [];
    const elements = this.getListElements();
    for(let i in elements){
      out.push(elements[i]);
    }
    return (
      <View>
          {out}
      </View>
    );
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

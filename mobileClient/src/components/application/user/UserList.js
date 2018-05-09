import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';

export default class UserList extends Component {
  getListElements(){
    const { users } = this.props;
    let out = {};
    for(let key in users){
      const { _id, name, email } = users[key];
      out[_id]=(
        <View key={Math.random()} style={styles.list}>
          <Text style={styles.element}>
          {name}
          </Text>
          <Text style={styles.element}>
          {email}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.addUser.bind(this)}>
            <Text style={styles.element}>
            {"Add " + name+"!"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return out;
  }
  addUser(){

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
    flexDirection: "row"
  },
  button: {
    flex: 1
  },
  element: {
    flex: 1,
    fontSize: 15
  }
});

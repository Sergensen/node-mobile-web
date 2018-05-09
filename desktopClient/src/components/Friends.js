import React, { Component } from 'react';
import Auth from '../modules/Auth';
import parse from 'jwt-decode';
import axios from 'axios';

export default class Friends extends Component {
  constructor(props){
    super(props);
    this.state={
      friends: {}
    }
  }
  componentDidMount(){
    this.getFriends();
  }
  render() {
    return (
      <div>
        {this.getUserFriends()}
      </div>
    );
  }
  getFriends(){
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/friends',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => this.setState({friends: res.data.message}))
    .catch((error) => console.log(error));
  }
  deleteUser(e){

  }
  getUserFriends(){
    const { friends } = this.state;
    console.log(friends);
    const out = [];
    for(let key in friends){
      const { name, email, _id } = friends[key];
      out.push(
        <div key={key} style={styles.wrapper}>
          <h4 style={{width:"100%"}}>Friends</h4>
          <p style={styles.element}>{name}</p>
          <p style={styles.element}>{email}</p>
          <button id={_id} onClick={this.deleteUser.bind(this)} style={styles.element}>{"Delete "+name+"!"}</button>
        </div>
      );
    }
    return out;
  }
}

const styles={
  wrapper:{
    width: "100%",
    boxSizing: "border-box",
    display: "inline-block",
    border:"1px solid black"
  },
  element:{
    width: "50%",
    boxSizing: "border-box",
    display: "inline-block"
  }
}

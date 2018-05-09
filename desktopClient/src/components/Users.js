import React, { Component } from 'react';
import Auth from '../modules/Auth';
import parse from 'jwt-decode';
import axios from 'axios';

export default class Users extends Component {
  render() {
    return (
      <div>
        {this.getUserCards()}
      </div>
    );
  }
  addUser(e){
    const data= "from="+parse(Auth.getToken()).sub+"&to="+e.target.id;
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/add/',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  }
  getUserCards(){
    const { users } = this.props;
    const out = [];
    for(let key in users){
      const { name, email, _id } = users[key];
      out.push(
        <div key={key} style={styles.wrapper}>
          <p style={styles.element}>{name}</p>
          <p style={styles.element}>{email}</p>
          <button style={styles.element} id={_id} onClick={this.addUser.bind(this)}>{"Add "+name+"!"}</button>
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
    width: "33%",
    boxSizing: "border-box",
    display: "inline-block"
  }
}

import React, { Component } from 'react';
import Auth from '../../modules/Auth';
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
          <div style={styles.data}>
            <p style={styles.element}>{name}</p>
            <p style={styles.element}>{email}</p>
          </div>
          <button style={styles.button} id={_id} onClick={this.addUser.bind(this)}>{"Add "+name+"!"}</button>
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
    height: "30px",
    border:"1px solid grey"
  },
  element:{
    width: "50%",
    display: "inline-block",
    boxSizing: "border-box",
    margin: 0
  },
  data:{
    width: "70%",
    height: "30px",
    boxSizing: "border-box",
    display: "inline-block"
  },
  button: {
    border: "1px solid grey",
    boxSizing: "border-box",
    width: "30%",
    height: "28px",
    backgroundColor: "white"
  }
}

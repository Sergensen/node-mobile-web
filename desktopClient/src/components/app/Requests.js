import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import parse from 'jwt-decode';
import axios from 'axios';

export default class Requests extends Component {
  render() {
    const component = Object.keys(this.props.requests).length>0?(
      <div style={styles.wrapper}>
        <p style={styles.header}>Requests</p>
        {this.getUserRequests()}
      </div>
    ):"";
    return (
      <div>
        {component}
      </div>
    );
  }
  deleteUser(e){
    const data= "from="+e.target.id+"&to="+parse(Auth.getToken()).sub;
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/delete/request',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
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
  getUserRequests(){
    const { requests } = this.props;
    const out = [];
    for(let key in requests){
      const { name, email, id } = requests[key];
      out.push(
        <div key={key} style={styles.element}>
          <p style={styles.data}>{name}</p>
          <p style={styles.data}>{email}</p>
          <button id={id} onClick={this.addUser.bind(this)} style={styles.button}>{"Add"}</button>
          <button id={id} onClick={this.deleteUser.bind(this)} style={styles.button}>{"Delete"}</button>
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
  },
  header:{
    fontSize: 15,
    height: "20px",
    margin: 3,
    marginBottom: 1,
    fontFamily: "arial"
  },
  element:{
    width: "100%",
    display: "inline-block",
    boxSizing: "border-box",
    border: "1px solid grey",
    margin: 0,
    padding: 5
  },
  data:{
    width: "35%",
    boxSizing: "border-box",
    display: "inline-block",
    margin: 0
  },
  button: {
    border: "1px solid grey",
    boxSizing: "border-box",
    width: "15%",
    backgroundColor: "white"
  }
}

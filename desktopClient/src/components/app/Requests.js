import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import parse from 'jwt-decode';
import axios from 'axios';

export default class Requests extends Component {
  constructor(props){
    super(props);
    this.state={
      requests: {}
    }
  }
  componentDidMount(){
    this.getRequests();
  }
  render() {
    const component = Object.keys(this.state.requests).length>0?(
      <div style={styles.wrapper}>
        <h4 style={{width:"100%"}}>Requests</h4>
        {this.getUserRequests()}
      </div>
    ):"";
    return (
      <div>
        {component}
      </div>
    );
  }
  getRequests(){
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/inrequests',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => this.setState({requests: res.data.message}))
    .catch((error) => console.log(error));
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
    const { requests } = this.state;
    const out = [];
    for(let key in requests){
      const { name, email, id } = requests[key];
      out.push(
        <div key={key} style={styles.wrapper}>
          <p style={styles.element}>{name}</p>
          <p style={styles.element}>{email}</p>
          <button id={id} onClick={this.addUser.bind(this)} style={styles.element}>{"Add "+name+"!"}</button>
          <button id={id} onClick={this.deleteUser.bind(this)} style={styles.element}>{"Delete request!"}</button>
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

import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import parse from 'jwt-decode';
import axios from 'axios';

export default class Friends extends Component {
  render() {
    const component = Object.keys(this.props.friends).length>0?(
      <div style={styles.wrapper}>
        <h4 style={{width:"100%"}}>Friends</h4>
      </div>
    ):"";
    return (
      <div>
        {component}
      </div>
    );
  }
  deleteUser(e){
    const data= "from="+parse(Auth.getToken()).sub+"&to="+e.target.id;
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/delete/friend',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  }
  getUserFriends(){
    const { friends } = this.props;
    const out = [];
    for(let key in friends){
      const { name, email, id } = friends[key];
      out.push(
        <div key={key} style={styles.wrapper}>
          <p style={styles.element}>{name}</p>
          <p style={styles.element}>{email}</p>
          <button id={id} onClick={this.deleteUser.bind(this)} style={styles.element}>{"Delete "+name+"!"}</button>
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

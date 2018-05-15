import React, { Component } from 'react';
import { deleteUser } from '../../modules/Api';

export default class FriendsCard extends Component {
  render(){
    let lol = this.props.friend.split(",");
    const id = lol[3].split("'")[1];
    const email = lol[4].split("'")[1];
    const name = lol[6].split("'")[1];
      return (
        <div style={styles.wrapper}>
          <p style={styles.element}>{name}</p>
          <p style={styles.element}>{email}</p>
          <button id={id} onClick={this.deleteUser.bind(this)} style={styles.element}>{"Delete "+name+"!"}</button>
        </div>
      );
  }
  deleteUser(e){
    deleteUser(e.target.id);
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

import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import FriendsCard from './FriendsCard';

export default class Friends extends Component {
  render() {
    const component = Object.keys(this.props.friends).length>0?(
      <div style={styles.wrapper}>
        <h4 style={{width:"100%"}}>Friends</h4>
        {this.getUserFriends()}
      </div>
    ):<div />;
    return (
      <div>
        {component}
      </div>
    );
  }
  getUserFriends(){
    const { friends } = this.props;
    const out = [];
    for(let key in friends){
      out.push(<FriendsCard key={key} friend={friends[key]} />);
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

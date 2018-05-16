import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import axios from 'axios';
import Users from './Users';
import Search from './Search';
import Requests from './Requests';
import Friends from './Friends';
import { setUser } from '../../modules/Api';

export default class Dashboard extends Component {
  componentDidMount(){
    setUser(this.props.setUser, this.logout.bind(this));
  }

  logout(){
    Auth.deauthenticateUser();
    this.props.history.replace("/Authenticate");
  }

  render() {
    const { getFriend, userState, getUsers } = this.props;
    const { user, users } = userState;
    if(user){
      const { friends, inRequests, outRequests } = user;
      return (
        <div style={styles.wrapper}>
          <button style={{width:"100%", marginBottom: 30}} onClick={this.logout.bind(this)}>Logout</button>
          <Search getUsers={getUsers} />
          <Users users={users} />
          <Friends friends={friends} />
          <Requests requests={inRequests} />
        </div>
      );
    } else {
      return (
        <div>
          Loading..
        </div>
      );
    }
  }
}

const styles = {
  wrapper: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px"
  }
}

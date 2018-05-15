import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import axios from 'axios';
import Users from './Users';
import Requests from './Requests';
import Friends from './Friends';
import { getUsers, setUser } from '../../modules/Api';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      name:""
    }
  }
  componentDidMount(){
    setUser(this.props.setUser);
  }

  logout(){
    Auth.deauthenticateUser();
    this.props.history.replace("/Authenticate");
  }
  getUsers(){
    getUsers(this.state.name, this.props.getUsers);
  }
  onChange(e){
    this.setState({name:e.target.value});
  }
  render() {
    const { user, users } = this.props.userState;
    if(user){
      const { friends, inRequests, outRequests } = user;
      return (
        <div>
          You logged in!
          <button style={{width:"100%", marginBottom: 30}} onClick={this.logout.bind(this)}>Logout</button>
          <input type="text" onKeyUp={this.getUsers.bind(this)} onChange={this.onChange.bind(this)} placeholder="Search user" />
          <button onClick={this.getUsers.bind(this)}>Find users</button>
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

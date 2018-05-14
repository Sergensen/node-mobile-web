import React, { Component } from 'react';
import Auth from '../../modules/Auth';
import axios from 'axios';
import Users from './Users';
import Requests from './Requests';
import Friends from './Friends';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      users: []
    }
  }
  logout(){
    Auth.deauthenticateUser();
    this.props.history.replace("/Authenticate");
  }
  getUsers(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/user/'+this.state.name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
    .then((res) => this.setState({users: res.data.message}))
    .catch((error) => console.log(error));
  }
  onChange(e){
    this.setState({name:e.target.value});
  }
  render() {
    const { users } = this.state;
    console.log(users);
    return (
      <div>
        You logged in!
        <button style={{width:"100%", marginBottom: 30}} onClick={this.logout.bind(this)}>Logout</button>
        <input type="text" onChange={this.onChange.bind(this)} placeholder="Search user" />
        <button onClick={this.getUsers.bind(this)}>Find users</button>
        <Users users={users} />
        <Friends />
        <Requests />
      </div>
    );
  }
}

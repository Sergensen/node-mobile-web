import React, { Component } from 'react';
import { getUsers } from '../../modules/Api';

export default class Friends extends Component {
  constructor(props){
    super(props);
    this.state={
      name:""
    }
  }
  onChange(e){
    this.setState({name:e.target.value});
  }
  getUsers(){
    getUsers(this.state.name, this.props.getUsers);
  }
  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.getUsers.bind(this)} onChange={this.onChange.bind(this)} placeholder="Search user" />
        <button onClick={this.getUsers.bind(this)}>Find users</button>
      </div>
    );
  }
}

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
      <div style={styles.wrapper}>
        <input style={styles.input} type="text" onKeyUp={this.getUsers.bind(this)} onChange={this.onChange.bind(this)} placeholder="Search user" />
        <button style={styles.button} onClick={this.getUsers.bind(this)}>Find users</button>
      </div>
    );
  }
}
const styles = {
  wrapper: {
    width: "100%"
  },
  input: {
    boxSizing: "border-box",
    width: "70%",
    height: "30px",
    border: "1px solid grey",
    marginBottom: "10px"
  },
  button: {
    border: "1px solid grey",
    width: "30%",
    height: "30px",
    backgroundColor: "white"
  }
}

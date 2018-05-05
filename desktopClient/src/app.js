import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render(){
    return <div>Hello {this.props.name}</div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App name="Sergen" />, root);

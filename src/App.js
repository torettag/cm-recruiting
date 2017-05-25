import React, { Component } from 'react';
import logo from './images/logo.svg';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Editor from './components/Editor/Editor';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Login/>
      </div>
    );
  }
}

export default App;

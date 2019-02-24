import React, { Component } from 'react';
import './App.css';
import Editor from './components/Editor/Editor';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Editor/>
      </div>
    );
  }
}

export default App;

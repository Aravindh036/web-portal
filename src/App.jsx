import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Editor from './components/Editor/Editor';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/editor" component={Editor}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

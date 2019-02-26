import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Editor from './components/Editor/Editor';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Card from './components/Dashboard/Card/Card';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/editor" component={Editor}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/card" component={Card}/>
            <Route path="/" component={Login}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

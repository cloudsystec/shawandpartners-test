import React from 'react';
import './App.css';
import Nav from './Nav';
import Details from './Details';
import UserList from './UserList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <div className="App">
        <Nav />
        <Switch>
          <Route path="/detail/:id" component={Details} />
          <Route path="/" exact component={UserList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

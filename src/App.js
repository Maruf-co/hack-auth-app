import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Registration from './Registration';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
        </Switch>
      </div>
    );
  }
}

export default App;

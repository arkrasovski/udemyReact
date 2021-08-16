import React, { Component } from "react";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home/Home";
import Appointments from "./components/Appointments/Appointments";

class App extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route history={history} path="/home" component={Home} />
          <Route path="/appointments" component={Appointments} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

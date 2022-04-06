import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import ProviderEdit from "./Provider/ProviderEdit";
import ProviderList from "./Provider/ProviderList";
import LocaitonApp from "./Location/LocationApp";



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={ true } component={ Home } />
          <Route path="/location" component={LocaitonApp}/>
          <Route path="/providers" exact={true} component={ProviderList} />
          <Route path="/providers/:id" component={ProviderEdit} />
        </Switch>
      </Router>
    );
  }
}

export default App;

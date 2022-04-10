import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import ProviderList from "./Provider/ProviderList";
import Provider from "./Provider/provider";
import Booking from "./Booking/booking";



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/providers" exact={true} component={ProviderList} />
          <Route path="/provider/:id" component={Provider} />
          <Route path="/booking/:id" component={Booking} />
        </Switch>
      </Router>
    );
  }
}

export default App;

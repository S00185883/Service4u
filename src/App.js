import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ProviderList from "./Provider/ProviderList";
import Provider from "./Provider/provider";
import Booking from "./Booking/booking";
import Login from "./User/Login";
import Register from "./User/Register";
import Reset from "./User/Reset";
import Dashboard from "./User/Dashboard";



class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact={true} component={Home} />
          <Route path="/providers" exact={true} component={ProviderList} />
          <Route path="/provider/:id" component={Provider} />
          <Route path="/booking/:id" component={Booking} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

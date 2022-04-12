import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Provider from "./Provider/provider";
import Booking from "./Booking/booking";
import Login from "./User/Login";
import Register from "./User/Register";
import Reset from "./User/Reset";
import Dashboard from "./User/Dashboard";
import Location from "./Location/Location";



class App extends Component {
  render() {
    return (
      <Router>
        <Routes>

          <Route path="/provider/:id" element={<Provider />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/location" element={<Location />} />

          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Booking from "./Booking/booking";
import Login from "./User/Login";
import Register from "./User/Register";
import Reset from "./User/Reset";
import Dashboard from "./Home/Dashboard";
import Location from "./Location/Location";
import ProviderPage from "./Provider/ProviderPage";
import Review from "./Provider/Reviews/reviews";
import ProfileInfo from "./Profile/ProfileInfo";



class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/provider/:id" element={<ProviderPage />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/location" element={<Location />} />
          <Route exact path="/review" element={<Review />} />
          <Route exact path="/profile" element={<ProfileInfo />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import {
  Button,
  Card,
  CardGroup,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ProviderInfo from "./Providerinfo";
const Home = () => {
  const isLoggedIn = () => {
    return window.localStorage.getItem("value"); // !! : cast to boolean
  };
  function refreshPage() {
    window.location.reload(false);
  }
  const [value, setValue] = useState(isLoggedIn());
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
    window.localStorage.setItem( "value", e );
        window.location.reload(false);

  };

  return (
    <>
      <AppNavbar />
      <DropdownButton
        alignRight
        title={value}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="All">All Services</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="Taxi">Taxi</Dropdown.Item>
        <Dropdown.Item eventKey="Plumbing">Plumbing</Dropdown.Item>
        <Dropdown.Item eventKey="PetCare">Pet Care</Dropdown.Item>
        <Dropdown.Item eventKey="Electrician">Electrician</Dropdown.Item>
        <Dropdown.Item eventKey="Carpentry">Carpentry</Dropdown.Item>
      </DropdownButton>

      {ProviderInfo(value)}
      {isLoggedIn}
    </>
  );
};
export default Home;

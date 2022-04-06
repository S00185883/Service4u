import React, { Component } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <DropdownButton id="dropdown-item-button" title="Sector">
        <Dropdown.ItemText>Plumbing</Dropdown.ItemText>
        <Dropdown.Item as="button">Eletrician</Dropdown.Item>
        <Dropdown.Item as="button">Pets</Dropdown.Item>
        <Dropdown.Item as="button">Cleaning</Dropdown.Item>
      </DropdownButton>
    );
  }
}

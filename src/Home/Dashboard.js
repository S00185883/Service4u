import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppNavbar from "../Utils/AppNavbar";
import "./dashboard.css";
import { Breadcrumb, Button, Dropdown, DropdownButton } from "react-bootstrap";
import ProviderInfo from "./Providerinfo";
import {
  Breadcrumbs,
  Divider,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
function Dashboard() {
  const refreshPage = () => {
    return window.localStorage.getItem("value"); // !! : cast to boolean
  };

  const [value, setValue] = useState(refreshPage());
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
    window.localStorage.setItem("value", e);
    window.location.reload(false);
  };

  const location = window.localStorage.getItem("county");

  return (
    <>
      <AppNavbar />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="lightgrey" href="/location">
          Location
        </Link>
        <Typography color="white">Home</Typography>
      </Breadcrumbs>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      <DropdownButton className="dropdownbutton" title={value} onSelect={handleSelect}>
        <Dropdown.Item eventKey="All">All Services</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="Taxi">Taxi</Dropdown.Item>
        <Dropdown.Item eventKey="Plumbing">Plumbing</Dropdown.Item>
        <Dropdown.Item eventKey="PetCare">Pet Care</Dropdown.Item>
        <Dropdown.Item eventKey="Electrician">Electrician</Dropdown.Item>
        <Dropdown.Item eventKey="Carpentry">Carpentry</Dropdown.Item>
      </DropdownButton>
<br/>
      {ProviderInfo(value)}
    </>
  );
}

export default Dashboard;

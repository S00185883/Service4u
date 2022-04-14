import React, { useEffect, useState } from "react";
import "./provider.css";

import Review from "./Reviews/reviews";
import Service from "./Services/service";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ReviewForm from "./Reviews/reviewform";
import AppNavbar from "../Utils/AppNavbar";
import CheckIcon from "@material-ui/icons/Check";
import {
  Breadcrumbs,

  Link,

} from "@mui/material";

import { Divider, InputBase, Menu, MenuItem } from "@mui/material";
import Provider from "./provider";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ProviderPage() {
  const refreshPage = () => {
    return window.localStorage.getItem("value"); // !! : cast to boolean
  };
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
  const [values, setValues] = useState(refreshPage());
  const handleSelect = (e) => {
    console.log(e);
    setValues(e);
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
        <Link underline="hover" color="lightgrey" href="/dashboard">
          Home
        </Link>
        <Typography color="white">{values}</Typography>
      </Breadcrumbs>
      <Provider />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Services" {...a11yProps(0)} />
            <Tab label="Leave a review" {...a11yProps(1)} />
            <Tab label="Reviews" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Service />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ReviewForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Review />{" "}
        </TabPanel>
      </Box>
    </>
  );
}

export default ProviderPage;

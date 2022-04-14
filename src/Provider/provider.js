import React, { useState, useEffect, useReducer } from "react";
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
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
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
const Provider = (providerId) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [services, setServices] = useState([]);
  const [value, setValue] = React.useState(0);

  const Item = styled(Paper)(({ theme }) => ({
    // // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    // color: theme.palette.text.secondary,
  }));
  const ddd = window.location.href;
  const answer = ddd.split("/").pop();
  const [providerIds, setProviderId] = useState(answer);
  useEffect(() => {
    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/provider/" +
        providerIds
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUser(data);
          window.localStorage.setItem("provider", answer);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>

        <div class="wrapper">
          <div class="profile-card js-profile-card">
            <div class="profile-card__img">
              <img src={user.image} alt="profile card" />
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">{user.name}</div>
              <div class="profile-card__txt">
                {" "}
                <strong>
                  <LocalPhoneIcon />
                </strong>
                {user.phone} &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <strong>
                  <EmailIcon />
                </strong>
                {user.email}
              </div>
              <div class="profile-card-loc">
                <span class="profile-card-loc__icon">
                  <svg class="icon"></svg>
                </span>

                <span class="profile-card-loc__txt"><HomeIcon/>
                  {user.addressLineOne},{user.addressLineTwo},{user.town},
                  {user.county},{user.eircode}
                </span>
              </div>

              <div class="profile-card-ctr">{user.description}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Provider;

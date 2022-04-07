import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";

import {
  Button,
  Card,
  CardGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const Provider = (providerId) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
const ddd = window.location.href;
    console.log( ddd );
    const answer= ddd.split("/").pop();

  useEffect(() => {
    fetch('http://localhost:4567/provider/'+answer)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUser(data);
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
        <AppNavbar />

          <li key={user.providerId}>{user.name}</li>
     
      </>
    );
  }
};
export default Provider;

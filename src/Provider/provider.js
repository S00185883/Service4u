import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";

import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const Provider = (providerId) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [services, setServices] = useState([]);

  const ddd = window.location.href;
  console.log(ddd);
  const answer = ddd.split("/").pop();

  useEffect(() => {
    fetch("http://localhost:4567/provider/" + answer)
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
    fetch("http://localhost:4567/services/provider/" + answer)
      .then((res) => res.json())
      .then(
        (services) => {
          setIsLoaded(true);
          setServices(services);
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
        <h2>Services</h2>
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            {services.map((service) => (
              <tbody>
                <tr>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>€{service.price}</td>
                  <td> <Button>
                      <Link
                        size="sm"
                        color="primary"
                        tag={Link}
                        to={"/booking/" + service.serviceId}>Book</Link></Button>
                       </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      </>
    );
  }
};
export default Provider;

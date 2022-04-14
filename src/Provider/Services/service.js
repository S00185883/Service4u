import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
const Service = (providerId) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [services, setServices] = useState([]);

  const ddd = window.location.href;
  const answer = ddd.split("/").pop();
    const [ providerIds, setProviderId ] = useState( answer );
      const provider = window.localStorage.getItem("provider");

  useEffect(() => {
    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/services/provider/" +
        provider
    )
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
        <div className="mainProvider">
          <h5>Services</h5>
          <div className="servicesProvider">
            <Table striped bordered hover clas>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>
                    Price <p className="estimate">(Estimate)</p>
                  </th>
                  <th></th>
                </tr>
              </thead>
              {services.map((service) => (
                <tbody>
                  <tr>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>€{service.price}</td>
                    <td>
                      {" "}
                      <Button>
                        <Link
                          size="sm"
                          className="link"
                          color="primary"
                          tag={Link}
                          to={"/booking/" + service.serviceId}
                        >
                          Book
                        </Link>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>

          </div>
        </div>
      </>
    );
  }
};
export default Service;

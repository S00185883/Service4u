import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import { Button, Card, CardGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("Taxi");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  useEffect(() => {
    fetch("http://localhost:4567/providers/sector/" + value)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
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
        <DropdownButton
          alignRight
          title={value}
          id="dropdown-menu-align-right"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="">All Services</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="Taxi">Taxi</Dropdown.Item>
          <Dropdown.Item eventKey="Plumbing">Plumbing</Dropdown.Item>
          <Dropdown.Item eventKey="PetCare">Pet Care</Dropdown.Item>
          <Dropdown.Item eventKey="Eletrician">Eletrician</Dropdown.Item>
          <Dropdown.Item eventKey="Carpentry">Carpentry</Dropdown.Item>
        </DropdownButton>
        <CardGroup>
          {users.map((user) => (
            // <li key={ user.providerId }>{ user.name }</li>
            <>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <ul>
                      {" "}
                      <li>{user.addressLineOne}</li>
                      <li>{user.addressLineTwo}</li>
                      <li>{user.town}</li>
                      <li>{user.county}</li>
                      <li>{user.eircode}</li>
                      <li>{user.providerId}</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button

                  >
                    <Link
                      size="sm"
                      color="primary"
                      tag={Link}
                      to={"/provider/" + user.providerId}
                    >
                      Find out More
                    </Link>
                  </Button>
                </Card.Footer>
              </Card>
            </>
          ))}
        </CardGroup>
      </>
    );
  }
};
export default Home;

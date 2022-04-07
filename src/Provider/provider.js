import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import {
  Button,
  Card,
  CardGroup,

} from "react-bootstrap";
import { Link } from "react-router-dom";
const Provider = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4567/providers/sector/${this.props.match.params.id}`)
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
                    size="sm"
                    color="primary"
                    tag={Link}
                    to={"/providers/" + user.providerId}
                  >
                    Edit
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
export default Provider;

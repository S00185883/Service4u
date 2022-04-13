import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const ProviderInfo = (value,selection) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ users, setUsers ] = useState( [] );
   const location = window.localStorage.getItem("county");

const refresh = () => {
  // re-renders the component
  this.setState({});
};

  useEffect(() => {
    fetch("http://localhost:4567/providers/"+location+"/"+value)
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
        <CardGroup>
          {users.map((user) => (
            // <li key={ user.providerId }>{ user.name }</li>
            <>
              <Row xs={1} md={0}>
                <Card>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Img variant="top" src={user.image}></Card.Img>
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
                    <Link
                      className="link"
                      size="sm"
                      color="white"
                      to={"/provider/" + user.providerId}
                    >
                      Find out More
                    </Link>
                  </Card.Footer>
                </Card>
              </Row>
            </>
          ))}
        </CardGroup>
      </>
    );
  }
};
export default ProviderInfo;

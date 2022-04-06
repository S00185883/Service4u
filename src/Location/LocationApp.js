import React, { useState, Component } from "react";
import { geolocated } from "react-geolocated";

import { Link } from "react-router-dom";
import Map from "./mapsetup";
import { Button, Card, CardGroup } from "react-bootstrap";

const Location = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);


  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  const location = {
    lat: lat,
    lng: lng,
  };
  return (
    // <Card variant="outlined" className="card">
    //   <CardGroup>
    //     <Button
    //       className="Button"
    //       size="small"
    //       color="primary"
    //       onClick={getLocation}
    //     >
    //       Allow Location
    //     </Button>
    //     <br />
    //   </CardGroup>
    //   <span>{status}</span>
    //   <CardActionArea>
    //     <CardContent className="mapstyle">
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <Map location={location} zoomLevel={16} className="Map" />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button className="Button" size="small" color="primary" href="/home">
    //       Continue
    //     </Button>
    //   </CardActions>
    // </Card>
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Location;

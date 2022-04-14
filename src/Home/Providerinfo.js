import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button,Link, CardActionArea, CardActions, Grid } from "@mui/material";
const ProviderInfo = (value, selection) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const location = window.localStorage.getItem("county");

  const refresh = () => {
    // re-renders the component
    this.setState({});
  };

  useEffect(() => {
    if (value == "All") {
      fetch(
        "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/providers/" +
          location
      )
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
    } else {
      fetch(
        "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/providers/" +
          location +
          "/" +
          value
      )
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
    }
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {" "}
          {users.map((user) => (
            // <li key={ user.providerId }>{ user.name }</li>
            // <>
            //   <Row xs={1} md={0}>
            //     <Card>
            //       <Card.Img
            //         variant="top"
            //         className="img"
            //         src={user.image}
            //       ></Card.Img>
            //       <Card.Body>
            //         <Card.Title>{user.name}</Card.Title>
            //         <Card.Text>
            //           <ul>
            //             {" "}
            //             <li>{user.addressLineOne}</li>
            //             <li>{user.addressLineTwo}</li>
            //             <li>{user.town}</li>
            //             <li>{user.county}</li>
            //             <li>{user.eircode}</li>
            //             <li>{user.providerId}</li>
            //           </ul>
            //         </Card.Text>
            //       </Card.Body>
            //       <Card.Footer>
            //         <Link
            //           className="link"
            //           size="sm"
            //           color="white"
            //           to={"/provider/" + user.providerId}
            //         >
            //           Find out More
            //         </Link>
            //       </Card.Footer>
            //     </Card>
            //   </Row>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={user.image}
                    alt={user.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" href={"/provider/" + user.providerId}>
                    More Info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* </CardGroup> */}
        </Grid>
      </>
    );
  }
};
export default ProviderInfo;

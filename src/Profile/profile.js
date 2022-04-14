import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import { Link } from "react-router-dom";
import { Button, Card, CardGroup, Row } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
const Profile = (providerId) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReview] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [provider, setProvider] = useState([]);

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const email = window.localStorage.getItem("email");
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const ddd = window.location.href;
  console.log(ddd);
  const answer = ddd.split("/").pop();
  const [providerIds, setProviderId] = useState(answer);

  useEffect(() => {
    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/review/" +
        email
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setReview(data);
          window.localStorage.setItem("provider", answer);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/booking/" +
        email
    )
      .then((res) => res.json())
      .then(
        (services) => {
          setIsLoaded(true);
          setBookings(services);
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
          {reviews.map((review) => (
            // <li key={ user.providerId }>{ user.name }</li>
            <>
              <Row xs={1} md={0}>
                <Card>
                  <Card.Body>
                    <Card.Title>{review.customer}</Card.Title>
                    <Card.Text>
                      <ul>
                        {" "}
                        <li>{review.rating}</li>
                        <li>{review.review}</li>
                        <li>{review.providerId}</li>
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
        <CardGroup>
          {bookings.map((booking) => (
            // <li key={ user.providerId }>{ user.name }</li>
            <>
              <Row xs={1} md={0}>
                <Card>
                  <Card.Body>
                    <Card.Title>{booking.customer}</Card.Title>
                    <Card.Text>
                      <ul>
                        {" "}
                        <li>{booking.where}</li>
                        <li>{booking.when}</li>
                        <li>{booking.providerId}</li>
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
export default Profile;

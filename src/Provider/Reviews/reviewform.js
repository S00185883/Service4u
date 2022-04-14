import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import { Form, Button } from "react-bootstrap";

const ReviewForm = (answer) => {
  const [setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [apiData, setData] = useState([]);

  const navigate = useNavigate();
  const provider = window.localStorage.getItem("provider");
  const [review, setReview] = useState("");
  const [value, setValue] = React.useState();
  const [hover, setHover] = React.useState(-1);
  const servicething = window.location.href;
  const serviceanswer = servicething.split("/").pop();

  const theme = useTheme();

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
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
    // eslint-disable-next-line
  }, [user, loading]);

  const rating = value;
  const providerid = serviceanswer;
  const customer = name;
  const customeremail = user.email;
  const date = new Date();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = {
      providerid,
      customer,
      customeremail,
      review,
      rating,
      date,
    };
    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/reviews/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      }
    ).then(() => {
      console.log("new review");
    });
  };
  function SubmitButton() {
    if (review && rating) {
      return (
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="submit" disabled>
          Submit
        </Button>
      );
    }
  }
  const initial = name.charAt(0);

  const project = (rating) => {
    switch (rating) {
      case 1:
        return <Rating name="disabled" value={1} disabled />;
      case 2:
        return <Rating name="disabled" value={2} disabled />;
      case 3:
        return <Rating name="disabled" value={3} disabled />;
      case 4:
        return <Rating name="disabled" value={4} disabled />;
      case 5:
        return 5;

      default:
        return <Rating name="disabled" value={0} disabled />;
    }
  };
  return (
    <>
      <h5>Leave a Review</h5>

      <div className="commentSection">
        <Form>
          <Form.Group controlId="form.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={name} disabled />
          </Form.Group>

          <Form.Group controlId="form.Email">
            <Form.Label>Rating</Form.Label>

            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={value}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  window.localStorage.setItem("rating", newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </Form.Group>
          <Form.Group controlId="form.Textarea">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <SubmitButton />
        </Form>
      </div>
      <div>
      </div>
    </>
  );
};
export default ReviewForm;

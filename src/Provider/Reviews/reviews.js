import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Rating from "@mui/material/Rating";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Button } from "react-bootstrap";

const Review = (answer) => {
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
  useEffect(() => {
    fetch(
      "http://service4u-env.eba-rtjmk8pw.us-east-1.elasticbeanstalk.com/review/provider/" +
        provider
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setData(data);
        },
        (error) => {
          setError(error);
        }
      );
    // eslint-disable-next-line
  }, []);

  const initial = name.charAt(0);

  return (
    <>

      <div>
        <h5>Reviews</h5>
        {apiData.map((datas) => (
          <Card
            sx={{
              maxWidth: "100%",
              margin: 5,
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {initial}{" "}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={datas.customeremail}
              subheader={datas.date.slice(0, 10)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {datas.review}
              </Typography>
            </CardContent>
            <CardContent disableSpacing>
              {" "}
              <div>
                {" "}
                <Rating name="disabled" value={datas.rating} disabled />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Review;

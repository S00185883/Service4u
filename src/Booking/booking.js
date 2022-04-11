import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import AppNavbar from "../Utils/AppNavbar";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import "../Booking/booking.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
const servicething = window.location.href;
console.log(servicething);
const serviceanswer = servicething.split("/").pop();

const Booking = () => {
    const [value, setValue] = useState("");

  const [names, setNames] = useState("");
  const [locaiton, setLocation] = useState("");
  const [datetime, setDateTime] = useState("");
  const [customer, setCustomer] = useState("");
  const [serviceid, setServiceId] = useState(serviceanswer);
  const [providerid, setProviderId] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const disableWeekends = (current) => {
    return current.day() !== 0 && current.day() !== 6;
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
  }, [user, loading]);
  useEffect(() => {
    fetch("http://localhost:4567/service/" + serviceanswer)
      .then((res) => res.json())
      .then((service) => {
        setService(service);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:4567/provider/" + service.providerid)
      .then((res) => res.json())
      .then((data) => {
        setProvider(data);
      });
  }, []);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        body: JSON.stringify({
          locaiton: locaiton,
          datetime: datetime,
          customer: customer,
          providerid: providerid,
          serviceid: serviceid,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setLocation("");
        setDateTime(date);
        setCustomer("");
        setProvider("");
        setServiceId(serviceanswer);
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AppNavbar />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Mobile Number"
            onChange={(e) => setCustomer(e.target.value)}
            disabled
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Service</Form.Label>
          <Form.Control type="text" value={service.name} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Provider</Form.Label>
          <Form.Control
            type="text"
            value={provider.name}
            onChange={(e) => setProviderId(service.providerid)}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="address"
            value={locaiton}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date and Time</Form.Label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                minDate={new Date()}
                minTime={new Date(0, 0, 8, 8)}
                maxTime={new Date(0, 0, 0, 18, 45)}
              />
            </Stack>
          </LocalizationProvider>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {date}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Booking;

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import AppNavbar from "../Utils/AppNavbar";
import moment from "moment";
import "../Booking/booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
const servicething = window.location.href;
console.log(servicething);
const serviceanswer = servicething.split("/").pop();

const Booking = () => {
  const [value, setValue] = useState("");
  const [days, setDays] =useState("");
const refreshPage = (date) => {
  setDate( date );
};
  const [names, setNames] = useState("");
  const [location, setLocation] = useState("");
  // const [date, setDate] = useState(checkInDate);

  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [provider, setProvider] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
 const [checkInDate, setCheckInDate] = useState(null);

 const handleCheckInDate = (date) => {
   setCheckInDate( date );
    window.localStorage.setItem("date", date);
 };

function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
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
    fetch("http://localhost:4567/provider/" + service.providerid)
      .then((res) => res.json())
      .then((data) => {
        setProvider(data);
      });
  }, []);

  const customer = name;
  const serviceId = serviceanswer;
  const providerId = provider.providerId;
  // const datetime = value;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = { location, date, serviceId, customer, providerId };
    fetch("http://localhost:4567/bookings", {
      method: "POST",
      headers: { "Content-Type": "Bookinglication/json" },
      body: JSON.stringify(booking),
    }).then(() => {
      console.log("new booking");
    });
  };

  return (
    <div>
      <AppNavbar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="address"
            value={datetime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date and Time</Form.Label>
          <br />
             <div className="App">
      <div className="input-container">
        <div>
          <label> Date</label>
          <DatePicker
            selected={checkInDate}
            minDate={new Date()}
            onChange={handleCheckInDate}
          />
        </div>
      </div>
      {checkInDate &&(
        <div className="summary">
          <p>
            You picked {moment(checkInDate).format("LL")}.
          </p>
        </div>
      ) }
      
    </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {date}
        {provider.name}
        {refreshPage}
      </Form>
    </div>
  );
};
export default Booking;


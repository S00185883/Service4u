import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AppNavbar from "../Utils/AppNavbar";
import moment from "moment";
import "../Booking/booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../User/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { send } from "emailjs-com";
import emailjs from "emailjs-com";

const servicething = window.location.href;
console.log(servicething);
const serviceanswer = servicething.split("/").pop();

const Booking = () => {
  const refreshPage = () => {
    return window.localStorage.getItem("date"); // !! : cast to boolean
  };
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(refreshPage());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [service, setService] = useState("");
  const [provider, setProvider] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(null);

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    window.localStorage.setItem("date", date);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    }).then(() => {
      console.log( "new booking" );
      handleShow();
      emailjs.send(
        "service_nrc1joz",
        "template_4mka4fc",
        toSend,
        "qljKFjl962AyL9N-8"
      );
    });
  };
  const toSend = {
    to_email: user.email,
    to_name: name,
    providername: provider.name,
    servicename: service.name,
    providernumber: provider.phone,
    servicedate: date,
    location: location,
  };
  function SubmitButton() {
    if (location && checkInDate) {
      return (
        <Button variant="primary" type="submit">
       Book
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="submit" disabled>
          Book
        </Button>
      );
    }
  }
  
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date and Time</Form.Label>
          <br />
          <DatePicker
            selected={checkInDate}
            minDate={new Date()}
            onChange={handleCheckInDate}
            isClearable
            placeholderText="Pick a Date"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />

          {checkInDate && (
            <div className="summary">
              <p>You picked {moment(checkInDate).format("LL")}.</p>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <SubmitButton />
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Company</h4> {provider.name}
            <br />
            <h4>Service</h4>
            {service.name}
            <br />
            <h4>Where</h4>
            {location}
            <br />
            <h4>When</h4>
            {date}
            <br />
            <h4>How Much</h4>
            {service.price}
            <br />
          </Modal.Body>
          <Modal.Footer>
            A Confirmation email should be sent to you at {user.email}
            <Button variant="secondary">
              <Link className="link" to="/dashboard">
                Confirm
              </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};;
export default Booking;

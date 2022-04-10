import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import AppNavbar from "../Utils/AppNavbar";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import "../Booking/booking.css"
const servicething = window.location.href;
console.log(servicething);
const serviceanswer = servicething.split("/").pop();

const Booking = () => {
  const [name, setName] = useState("");
  const [locaiton, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerid, setCustomer] = useState("");
  const [serviceid, setServiceId] = useState(serviceanswer);
  const [providerid, setProvider] = useState("");
    const [ service, setService ] = useState( "" );
      const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const [value, setValue] = React.useState(new Date());

let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        locaiton: locaiton,
        date: date,
        time: time,
        customerid: customerid,
        providerid: providerid,
        serviceid: serviceid,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setName("");
        setLocation( "" );
        setDate( "" );
        setTime( "" );
        setCustomer( "" );
        setProvider( "" );
        setServiceId( "" );
      setMessage("User created successfully");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetch("http://localhost:4567/service/" + serviceanswer)
      .then((res) => res.json())
      .then((service) => {
        setService(service);
      }); 
  }, [] );
      useEffect(() => {
    
        fetch("http://localhost:4567/provider/" + service.providerid)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          });
      }, []);
  return (
    <div>
      <AppNavbar />
      {/* <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => set(e.target.value)}
          />
          <input
            type="text"
            value={mobileNumber}
            placeholder="Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div> 
    <Form>
        <>
          <Form.Group className="mb-3">
            <Form.Label>Service</Form.Label>
            <Form.Control placeholder={service.name} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder={service.description} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control placeholder={service.price} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Provider</Form.Label>
            <Form.Control placeholder={user.name} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Can't check this" />
          </Form.Group>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>  */}
      <div class="wrapper">
        <form>
          <h2>Booking Form</h2>
          <label class="desc" id="title1" for="test1">
            Details
          </label>
          <input
            type="text"
            id="test1"
            class="text-field"
            placeholder="leaks"
            disabled
          />

          <label class="desc" id="title2" for="password">
            Where{" "}
          </label>
          <input
            type="password"
            id="password"
            class="text-field"
            placeholder="Password"
            disabled
          />

          <label class="desc" id="title3" for="adults">
            When
          </label>
          <input
            type="number"
            id="adults"
            class="text-field"
            name="adults"
            min="1"
            max="20"
            step="1"
            value="1"
          />

          <label class="desc" id="title1" for="arrival">
            When
          </label>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
          <br></br>

          <input type="button" value="Search" class="button" />
        </form>
      </div>
    </div>
  );
};
export default Booking;


import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import AppDropdown from "../Utils/AppDropdown";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4567/providers/")
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
        <AppNavbar />
        <AppDropdown/>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </>
    );
  }
};
export default Home;
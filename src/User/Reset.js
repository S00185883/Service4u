import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div>
      <div className="body">
        <div class="container">
          <div class="main sign-in">
            <div class="card">
              <div class="logo"></div>
              <div class="card-head">
                <h3 class="header">Sign In</h3>
              </div>
              <div class="card-body">
                <form id="frmLogin">
                  <Box
                    className="box"
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    Validate
                    autoComplete="off"
                  >
                    <TextField
                      fullWidth
                      required
                      id="outlined-required"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <div class="form-group">
                    <Button
                      className="login__btn"
                      onClick={() => sendPasswordReset(email)}
                    >
                      Send password reset email
                    </Button>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <span>
                  Don't have an account?{" "}
                  <Link to="/register">
                    <a>Register</a>
                  </Link>{" "}
                  now.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;

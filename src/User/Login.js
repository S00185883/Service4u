import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/location");
    window.localStorage.setItem("email", user.email);
  }, [user, loading]);

  return (
    <>
   
      <div className="body">
        <div class="container">
          <div class="main sign-in">
            <div class="logincard">
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
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Box>
                  <div class="form-group">
                    <Button
                      className="login__btn"
                      onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                      Sign In
                    </Button>
                    <br />
                    <p>Or</p>

                    <FcGoogle onClick={signInWithGoogle} />
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <span>
                  <Link to="/reset"><a>Forgot Password</a></Link>
                </span>
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
    </>
  );
}

export default Login;

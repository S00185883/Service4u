import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Button, Form, Modal } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    // <div className="login">
    //   <div className="login__container">
    // <input
    //   type="text"
    //   className="login__textBox"
    //   value={email}
    //   onChange={(e) => setEmail(e.target.value)}
    //   placeholder="E-mail Address"
    // />
    // <input
    //   type="password"
    //   className="login__textBox"
    //   value={password}
    //   onChange={(e) => setPassword(e.target.value)}
    //   placeholder="Password"
    // />
    // <button
    //   className="login__btn"
    //   onClick={() => logInWithEmailAndPassword(email, password)}
    // >
    //   Login
    // </button>
    //     <button className="login__btn login__google" onClick={signInWithGoogle}>
    //       Login with Google
    //     </button>
    //     <div>
    //       <Link to="/reset">Forgot Password</Link>
    //     </div>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div>
    <>
      <div class="container">
        <div class="text">Log in to Continue</div>
        <div class="page">
          <div class="title">instagram</div>
          <Form>
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />{" "}
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button
              className="login__btn"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </Button>
            <div class="option">OR</div>
          </Form>
          <div class="fblink">
            <span class="fab fa-facebook"></span>
        <button  onClick={signInWithGoogle}>
          Login with Google
        </button>          </div>

          <div class="forget-id">
            <a href="#">Forget password?</a>
          </div>

          <div class="signup">
            <p>
              Don't have an account?<a href="#">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

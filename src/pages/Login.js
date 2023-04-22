import '../css/Login.css';
import Logo from '../assets/logo.png'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/Login.css";

function Login({setLoader}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
        setLoader(true);
        return;
    } else{
      setLoader(false);
    }
    if (user) {
      navigate('/');
    }
        
}, [user, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    logInWithEmailAndPassword(email, password).then(()=>{setLoader(false);});
  }

  const handleDemoClick = (event) => {
    event.preventDefault();
    setLoader(true);
    logInWithEmailAndPassword("demo@demo.com", "Testing@123").then(()=>{setLoader(false);});
  }

  return (
    <div className='App'>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label">Email: </label>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div className="input-container">
          <label className="label">Password: </label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <a href="#" className="link forgotten-password">
            Forgot password?
          </a>
          <a href="#" className="link forgotten-password">
            Not registered?
          </a>
        </div>
        <div>
          <button type="submit" id="login-btn">
            Login
          </button>
          <button onClick={handleDemoClick} id="login-btn2">
            Use Demo
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
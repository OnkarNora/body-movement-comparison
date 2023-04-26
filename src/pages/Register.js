// import Logo from '../assets/logo.png'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUserWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/Register.css";

function Register({setLoader}) {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    registerUserWithEmailAndPassword(name,email, password).then(()=>{setLoader(false);});
  }

  return (
    <div className='App'>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register Page</h1>
        <div className="input-container">
          <label className="label">Name: </label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
        </div>
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
        </div>
        <div>
          <button type="submit" id="Register-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
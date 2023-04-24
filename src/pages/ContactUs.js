// import React from "react";

// const Contact = () => {
// return (
// 	<div className="contact">
// 	<p style={{color:"blue"}}>email - gymwithml@gmail.com</p>
// 	</div>
// );
// };

// export default Contact;

import React, { useState } from "react";
// import firebase from "firebase";
import "./ContactForm.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const db = firebase.firestore();
    // db.collection("contacts").add({
    //   name,
    //   email,
    //   message,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    setName("");
    setEmail("");
    setMessage("");
    alert("Thank you for contacting us!");
  };

  return (
    <div className="contact-form-container">
      <h1 style={{color:'orange'}}>Contact Us</h1>
      <form onSubmit={handleFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Message:</td>
              <td>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Contact;



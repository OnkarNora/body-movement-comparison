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
      <h1 style={{color:'#383838'}}>Contact Us</h1>
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
          </tbody>
        </table>
      </form>
                <button style={{textAlign:'center'}}type="submit">Submit</button>
    </div>
  );
};

export default Contact;



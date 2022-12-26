import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import  { useState } from "react";
import { SidebarData } from "./SlidebarData";
import './Header.css';

function Header() {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <Navbar style={{ height: "5rem" }} bg="dark" variant="dark" >
        <Container>
          <IconContext.Provider   value={{ color: "#FFF" }}>
            {/* All the icons now are white */}
            <div className="navbar">
              <div to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} style={{ margin: "1rem"}} />
              </div>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <div to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </div>
                </li>

                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <div to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
          <Navbar.Brand href="#home">Gym app</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
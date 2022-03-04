import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Container } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function NavBar(props) {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Flow</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{user.email}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

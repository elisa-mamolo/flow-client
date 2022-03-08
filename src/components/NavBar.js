import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function NavBar(props) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Flow</Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/acquarium">Acquariums</Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user && (
                <p>
                  Signed in as: <a href="#login">{user.email}</a>{" "}
                  <Button className="bg-light text-black">Logout</Button>
                </p>
              )}{" "}
              {!user && (
                <div>
                  <Link to={`/login`}>
                    <Button>Login</Button>
                  </Link>
                  <Link to={`/signup`}>
                    <Button>Signup</Button>
                  </Link>
                </div>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

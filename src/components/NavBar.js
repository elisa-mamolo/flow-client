import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Button, Nav, Image } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import LogoImage from "../waveicon.png";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div>
      <Navbar className="navbar  navbar-dark bg-dark" variant="dark">
        <Container>
          <Image
            src={LogoImage}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="logo"
          />

          <Navbar.Brand href="/" className="ml-5">
            Flow
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/">Home</Nav.Link>
          {isLoggedIn && <Nav.Link href="/acquarium">Acquariums</Nav.Link>}

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {isLoggedIn && (
                <p>
                  Signed in as: <a href="#login">{user.username}</a>{" "}
                  <Button className="bg-light text-black" onClick={logOutUser}>
                    Logout
                  </Button>
                </p>
              )}{" "}
              {!isLoggedIn && (
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

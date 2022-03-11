import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Button, Nav, Image } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
//import LogoImage from "./images/waveiconnew.png";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function NavBar(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div>
      <Navbar className="navbar  navbar-dark bg-dark" variant="dark">
        <Container>
          <Image
            src="/images/wave2.png"
            width="70"
            height="70"
            className="d-inline-block align-top imagelogo"
            alt="logo"
          />

          <Navbar.Brand href="/" className=" text-white">
            Flow
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav.Link href="/" className="text-white">
            Home
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link href="/acquarium" className="text-white">
              Acquariums
            </Nav.Link>
          )}

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {isLoggedIn && (
                <p>
                  <Button
                    className="bg-light text-black btn-light"
                    onClick={logOutUser}
                  >
                    Logout
                  </Button>
                </p>
              )}{" "}
              {!isLoggedIn && (
                <div>
                  <Link to={`/login`}>
                    <Button className="btn-light mr-2">Login</Button>
                  </Link>
                  <Link to={`/signup`}>
                    <Button className="btn-light">Signup</Button>
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

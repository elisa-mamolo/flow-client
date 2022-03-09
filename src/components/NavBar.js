import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Button, Nav, Image } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import LogoImage from "../waveicon.png";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function NavBar(props) {
  const { user } = useContext(AuthContext);
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    setLoggedOut(true);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
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
              <Button className="bg-light text-black" onClick={logout}>
                Logout
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;

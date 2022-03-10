import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Form, Navbar } from "react-bootstrap";
import NavBarComponent from "../components/NavBar";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser(); // <== ADD
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        //const errorDescription = error.response.data.message;
        //setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="background">
      <NavBarComponent></NavBarComponent>
      <div className="LoginPage mt-5">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <h3>Login</h3>
              <Form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="form-control"
                  />

                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="form-control"
                  />
                  <br></br>

                  <Button type="submit" className="btn btn-light">
                    Login
                  </Button>
                </div>
              </Form>
              <br></br>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p>Don't have an account yet?</p>
              <Link to={"/signup"} className="text-white">
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
  );
}

export default LoginPage;

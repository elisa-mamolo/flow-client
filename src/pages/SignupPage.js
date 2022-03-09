import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <NavBar></NavBar>
      <div className="LoginPage mt-5">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center bg-dark ">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <Form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <h4 className="text-white">Signup</h4>
                  <label className="text-white">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="form-control"
                  />

                  <label className="text-white">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="form-control"
                  />

                  <label className="text-white">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    className="form-control"
                  />

                  <Button type="submit">Sign Up</Button>
                </div>
              </Form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p>Already have account?</p>
              <Link to={"/login"} className="text-white">
                {" "}
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

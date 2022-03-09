// src/components/AddProject.js

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Button, Form } from "react-bootstrap";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function AddAcquarium(props) {
  const [name, setName] = useState("");
  const [liters, setLiters] = useState(0);
  //check date if it is correct
  const [started, setStarted] = useState();
  const [logs, setLogs] = useState([]);
  //use context to get user and pass it to node
  const { user } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    //prevent rerendering
    e.preventDefault();

    const requestBody = { user, name, liters, started, logs };
    axios
      .post(`${API_URL}/acquarium`, requestBody)
      .then((response) => {
        // Reset the state
        setName("");
        setLiters(0);
        setStarted(new Date().toDateString());
        setLogs([]);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="AddAcquarium">
      <div className="LoginPage mt-5">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center bg-dark ">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <h3 className="title">Add Acquarium</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Form.Label>Liters:</Form.Label>
                  <input
                    type="number"
                    name="liters"
                    value={liters}
                    onChange={(e) => setLiters(e.target.value)}
                  />

                  <Form.Label>Start Date:</Form.Label>
                  <input
                    type="date"
                    name="started"
                    value={started}
                    onChange={(e) => setStarted(e.target.value)}
                  />

                  <Button type="submit">Submit</Button>
                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAcquarium;

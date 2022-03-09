import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, FormCheck, FormLabel } from "react-bootstrap";
import NavBar from "../components/NavBar";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function EditAcquariumPage(props) {
  const [name, setName] = useState("");
  const [liters, setLiters] = useState(0);
  //check date if it is correct
  const [started, setStarted] = useState();
  const [logs, setLogs] = useState([]);
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the URL parameter `:projectId`
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // prepopulate fields
    axios
      .get(`${API_URL}/acquarium/${id}`)
      .then((response) => {
        /*show current values in form*/
        const foundAcquarium = response.data;
        setName(foundAcquarium.name);
        setLiters(foundAcquarium.liters);
        setStarted(foundAcquarium.started);
        setLogs(foundAcquarium.logs);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormSubmit = (e) => {
    //submit form and redirect to the updated project
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { user, name, liters, started, logs };
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/acquarium/${id}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate("/acquarium");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <NavBar></NavBar>
      <h3>Edit Acquarium</h3>

      <Form onSubmit={handleFormSubmit}>
        <fieldset>
          <Form.Group className="">
            <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Liters</Form.Label>
            <Form.Control
              type="number"
              name="liters"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
            />
            <Form.Label>Started on</Form.Label>
            <Form.Control
              type="date"
              name="started"
              selected={started}
              value={started}
              onChange={(e) => setStarted(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditAcquariumPage;

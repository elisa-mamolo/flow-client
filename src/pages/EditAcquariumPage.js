import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, FormCheck, FormLabel } from "react-bootstrap";
import NavBar from "../components/NavBar";

const API_URL = process.env.SERVER || "http://localhost:5005";

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
    <section className="background">
      <NavBar></NavBar>

      <div className="LoginPage mt-5">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <h3 className="text-white">Edit Acquarium</h3>
              <Form onSubmit={handleFormSubmit}>
                <fieldset>
                  <Form.Group className="">
                    <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                    <Form.Label>Liters</Form.Label>
                    <Form.Control
                      type="number"
                      name="liters"
                      value={liters}
                      onChange={(e) => setLiters(e.target.value)}
                      className="form-control"
                    />
                    <Form.Label>Started on</Form.Label>
                    <Form.Control
                      type="date"
                      name="started"
                      selected={started}
                      value={started}
                      onChange={(e) => setStarted(e.target.value)}
                      className="form-control"
                    />
                  </Form.Group>
                  <br></br>
                  <Button type="submit">Submit</Button>
                </fieldset>
              </Form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
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

export default EditAcquariumPage;

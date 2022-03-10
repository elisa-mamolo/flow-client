import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import NavBarComponent from "../components/NavBar";
const API_URL = "https://flow-acquarium-app.herokuapp.com";

function AddLogPage(props) {
  const navigate = useNavigate();
  const { id } = useParams(); //id from acquarium page
  const [acquarium, setAcquarium] = useState(id);
  const [comments, setComments] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [ph, setPh] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [ammonia, setAmmonia] = useState(0);
  const [nitrite, setNitrite] = useState(0);
  const [nitrate, setNitrate] = useState(0);
  const [phosphate, setPhosphate] = useState(0);
  const [salinity, setSalinity] = useState(0);
  const [alkalinity, setAlkalinity] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [magnesium, setMagnesium] = useState(0);
  const [measurements, setMeasurements] = useState([
    {
      timestamp: timestamp,
      ph: ph,
      temperature: temperature,
      ammonia: ammonia,
      nitrite: nitrite,
      nitrate: nitrate,
      phosphate: phosphate,
      salinity: salinity,
      alkalinity: alkalinity,
      calcium: calcium,
      magnesium: magnesium,
    },
  ]);

  //use context to get user and pass it to node

  const handleSubmit = (e) => {
    //prevent rerendering
    e.preventDefault();
    let object = {
        timestamp,
        ph,
        temperature,
        ammonia,
        nitrite,
        nitrate,
        phosphate,
        salinity,
        alkalinity,
        calcium,
        magnesium,
      },
      measurements = [object];
    const requestBody = { acquarium, comments, measurements };

    axios
      .post(`${API_URL}/log`, requestBody)
      .then((response) => {
        // Reset the state
        setAcquarium("");
        setComments("");
        setMeasurements([]);
        navigate("/acquarium");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <section className="background">
      <NavBarComponent></NavBarComponent>
      <div className="alert alert-primary" role="alert">
        <h4 className="titles">Add Log for: {acquarium.name}</h4>
      </div>
      <div className="LoginPage mt-2">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <Form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col">
                    <Form.Group>
                      <Form.Label>Date:</Form.Label>
                      <input
                        type="date"
                        name="timestamp"
                        value={measurements.timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        className="form-control"
                      />
                      <Form.Label>Ph:</Form.Label>
                      <input
                        type="number"
                        name="ph"
                        value={measurements.ph}
                        onChange={(e) => setPh(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Temperature:</Form.Label>
                      <input
                        type="number"
                        name="temperature"
                        value={measurements.temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Ammonia:</Form.Label>
                      <input
                        type="number"
                        name="ammonia"
                        value={measurements.ammonia}
                        onChange={(e) => setAmmonia(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Nitrite:</Form.Label>
                      <input
                        type="number"
                        name="nitrite"
                        value={measurements.nitrite}
                        onChange={(e) => setNitrite(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Nitrate:</Form.Label>
                      <input
                        type="number"
                        name="nitrate"
                        value={measurements.nitrate}
                        onChange={(e) => setNitrate(Number(e.target.value))}
                        className="form-control"
                      />
                    </Form.Group>
                  </div>
                  <div class="col">
                    <Form.Label>Phosphate:</Form.Label>
                    <input
                      type="number"
                      name="phosphate"
                      value={measurements.phosphate}
                      onChange={(e) => setPhosphate(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Salinity:</Form.Label>
                    <input
                      type="number"
                      name="salinity"
                      value={measurements.salinity}
                      onChange={(e) => setSalinity(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Alkalinity:</Form.Label>
                    <input
                      type="number"
                      name="alkalinity"
                      value={measurements.alkalinity}
                      onChange={(e) => setAlkalinity(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Calcium:</Form.Label>
                    <input
                      type="number"
                      name="calcium"
                      value={measurements.calcium}
                      onChange={(e) => setCalcium(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Magnesium:</Form.Label>
                    <input
                      type="number"
                      name="magnesium"
                      value={measurements.magnesium}
                      onChange={(e) => setMagnesium(Number(e.target.value))}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <Form.Label>Comment:</Form.Label>
                    <input
                      type="text"
                      name="comments"
                      value={comments}
                      onChange={(e) => setComments(Number(e.target.value))}
                      className="form-control"
                    />
                    <Button type="submit" className="btn btn-light mt-2">
                      Submit
                    </Button>
                    {errorMessage && (
                      <p className="error-message">{errorMessage}</p>
                    )}
                  </div>
                </div>
              </Form>
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

export default AddLogPage;

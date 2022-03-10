import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Form, FormCheck, Label } from "react-bootstrap";
import NavBarComponent from "../components/NavBar";

const API_URL = process.env.SERVER || "http://localhost:5005";

function EditLogPage(props) {
  const navigate = useNavigate();
  const { logid, acquariumid } = useParams();
  const [acquarium, setAcquarium] = useState(acquariumid);
  const [comments, setComments] = useState("");

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

  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    // prepopulate fields
    axios
      .get(`${API_URL}/log/${logid}`)
      .then((response) => {
        /*show current values in form*/

        const foundItemMeasurements = response.data.measurements[0];
        const foundItem = response.data;

        setAcquarium(foundItemMeasurements.acquarium);
        setPh(foundItemMeasurements.ph);
        setTimestamp(foundItemMeasurements.timestamp);
        setTemperature(foundItemMeasurements.temperature);
        setAmmonia(foundItemMeasurements.ammonia);
        setNitrite(foundItemMeasurements.nitrite);
        setNitrate(foundItemMeasurements.nitrate);
        setSalinity(foundItemMeasurements.salinity);
        setPhosphate(foundItemMeasurements.phosphate);
        setSalinity(foundItemMeasurements.salinity);
        setAlkalinity(foundItemMeasurements.alkalinity);
        setCalcium(foundItemMeasurements.calcium);
        setComments(foundItem.comments);
      })
      .catch((error) => console.log(error));
  }, [logid]);

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
    };
    //measurements = [object];
    const requestBody = { acquarium, comments, measurements: [object] };

    axios
      .put(`${API_URL}/log/${logid}/${acquariumid}`, requestBody)
      .then((response) => {
        // Reset the state
        setAcquarium("");
        setComments("");
        // setMeasurements([]);
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

      <div className="mt-5">
        <div className="container h-100 w-50 ">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-white pt-5 pb-5">
              <h3 className="text-white">Edit Log</h3>

              <Form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col">
                    <Form.Group>
                      <Form.Label>Date:</Form.Label>
                      <input
                        type="date"
                        name="timestamp"
                        value={timestamp}
                        onChange={(e) => setTimestamp(e.target.value)}
                        className="form-control"
                      />
                      <Form.Label>Ph:</Form.Label>
                      <input
                        type="number"
                        name="ph"
                        value={ph}
                        onChange={(e) => setPh(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Temperature:</Form.Label>
                      <input
                        type="number"
                        name="temperature"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Ammonia:</Form.Label>
                      <input
                        type="number"
                        name="ammonia"
                        value={ammonia}
                        onChange={(e) => setAmmonia(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Nitrite:</Form.Label>
                      <input
                        type="number"
                        name="nitrite"
                        value={nitrite}
                        onChange={(e) => setNitrite(Number(e.target.value))}
                        className="form-control"
                      />

                      <Form.Label>Nitrate:</Form.Label>
                      <input
                        type="number"
                        name="nitrate"
                        value={nitrate}
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
                      value={phosphate}
                      onChange={(e) => setPhosphate(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Salinity:</Form.Label>
                    <input
                      type="number"
                      name="salinity"
                      value={salinity}
                      onChange={(e) => setSalinity(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Alkalinity:</Form.Label>
                    <input
                      type="number"
                      name="alkalinity"
                      value={alkalinity}
                      onChange={(e) => setAlkalinity(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Calcium:</Form.Label>
                    <input
                      type="number"
                      name="calcium"
                      value={calcium}
                      onChange={(e) => setCalcium(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Magnesium:</Form.Label>
                    <input
                      type="number"
                      name="magnesium"
                      value={magnesium}
                      onChange={(e) => setMagnesium(Number(e.target.value))}
                      className="form-control"
                    />
                    <Form.Label>Comment:</Form.Label>
                    <input
                      type="text"
                      name="comments"
                      value={comments}
                      onChange={(e) => setComments(Number(e.target.value))}
                      className="form-control"
                    />
                  </div>

                  <div className="col">
                    <br></br>
                    <Button type="submit">Submit</Button>
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

export default EditLogPage;

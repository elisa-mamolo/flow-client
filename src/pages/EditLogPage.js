import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

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
    <div className="AddAcquarium">
      <h3>Edit Log</h3>

      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <label>Ph:</label>
        <input
          type="number"
          name="ph"
          value={ph}
          onChange={(e) => setPh(Number(e.target.value))}
        />

        <label>Temperature:</label>
        <input
          type="number"
          name="temperature"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />

        <label>Ammonia:</label>
        <input
          type="number"
          name="ammonia"
          value={ammonia}
          onChange={(e) => setAmmonia(Number(e.target.value))}
        />

        <label>Nitrite:</label>
        <input
          type="number"
          name="nitrite"
          value={nitrite}
          onChange={(e) => setNitrite(Number(e.target.value))}
        />

        <label>Nitrate:</label>
        <input
          type="number"
          name="nitrate"
          value={nitrate}
          onChange={(e) => setNitrate(Number(e.target.value))}
        />
        <label>Phosphate:</label>
        <input
          type="number"
          name="phosphate"
          value={phosphate}
          onChange={(e) => setPhosphate(Number(e.target.value))}
        />
        <label>Salinity:</label>
        <input
          type="number"
          name="salinity"
          value={salinity}
          onChange={(e) => setSalinity(Number(e.target.value))}
        />
        <label>Alkalinity:</label>
        <input
          type="number"
          name="alkalinity"
          value={alkalinity}
          onChange={(e) => setAlkalinity(Number(e.target.value))}
        />
        <label>Calcium:</label>
        <input
          type="number"
          name="calcium"
          value={calcium}
          onChange={(e) => setCalcium(Number(e.target.value))}
        />
        <label>Magnesium:</label>
        <input
          type="number"
          name="magnesium"
          value={magnesium}
          onChange={(e) => setMagnesium(Number(e.target.value))}
        />
        <label>Comment:</label>
        <input
          type="text"
          name="comments"
          value={comments}
          onChange={(e) => setComments(Number(e.target.value))}
        />

        <Button type="submit">Submit</Button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditLogPage;

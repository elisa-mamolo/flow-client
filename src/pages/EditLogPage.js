import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

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
      },
      measurements = [object];
    const requestBody = { acquarium, comments, measurements };

    axios
      .put(`${API_URL}/log/${logid}/${acquariumid}`, requestBody)
      .then((response) => {
        // Reset the state
        setAcquarium("");
        setComments("");
        setMeasurements([]);
        navigate("/acquarium");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddAcquarium">
      <h3>Edit Log</h3>

      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="timestamp"
          value={measurements.timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <label>Ph:</label>
        <input
          type="number"
          name="ph"
          value={measurements.ph}
          onChange={(e) => setPh(Number(e.target.value))}
        />

        <label>Temperature:</label>
        <input
          type="number"
          name="temperature"
          value={measurements.temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />

        <label>Ammonia:</label>
        <input
          type="number"
          name="ammonia"
          value={measurements.ammonia}
          onChange={(e) => setAmmonia(Number(e.target.value))}
        />

        <label>Nitrite:</label>
        <input
          type="number"
          name="nitrite"
          value={measurements.nitrite}
          onChange={(e) => setNitrite(Number(e.target.value))}
        />

        <label>Nitrate:</label>
        <input
          type="number"
          name="nitrate"
          value={measurements.nitrate}
          onChange={(e) => setNitrate(Number(e.target.value))}
        />

        <label>Nitrate:</label>
        <input
          type="number"
          name="nitrate"
          value={measurements.nitrate}
          onChange={(e) => setNitrate(Number(e.target.value))}
        />
        <label>Phosphate:</label>
        <input
          type="number"
          name="phosphate"
          value={measurements.phosphate}
          onChange={(e) => setPhosphate(Number(e.target.value))}
        />
        <label>Salinity:</label>
        <input
          type="number"
          name="salinity"
          value={measurements.salinity}
          onChange={(e) => setSalinity(Number(e.target.value))}
        />
        <label>Alkalinity:</label>
        <input
          type="number"
          name="alkalinity"
          value={measurements.alkalinity}
          onChange={(e) => setAlkalinity(Number(e.target.value))}
        />
        <label>Calcium:</label>
        <input
          type="number"
          name="calcium"
          value={measurements.calcium}
          onChange={(e) => setCalcium(Number(e.target.value))}
        />
        <label>Magnesium:</label>
        <input
          type="number"
          name="magnesium"
          value={measurements.magnesium}
          onChange={(e) => setMagnesium(Number(e.target.value))}
        />
        <label>Comment:</label>
        <input
          type="text"
          name="comments"
          value={comments}
          onChange={(e) => setComments(Number(e.target.value))}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditLogPage;

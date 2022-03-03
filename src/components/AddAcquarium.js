// src/components/AddProject.js

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddAcquarium(props) {
  const [name, setName] = useState("");
  const [liters, setLiters] = useState(0);
  //check date if it is correct
  const [started, setStarted] = useState();
  const [logs, setLogs] = useState([]);
  //use context to get user and pass it to node
  const { user } = useContext(AuthContext);

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
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddAcquarium">
      <h3>Add Acquarium</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Liters:</label>
        <input
          type="number"
          name="liters"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
        />

        <label>Start Date:</label>
        <input
          type="date"
          name="started"
          value={started}
          onChange={(e) => setStarted(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddAcquarium;

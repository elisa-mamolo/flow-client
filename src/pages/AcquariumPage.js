import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAcquarium from "../components/AddAcquarium";
const API_URL = "http://localhost:5005";

function AcquariumPage() {
  const [acquariums, setAcquariums] = useState("");
  const [showlog, setShowlog] = useState(false);

  const getAcquariums = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/acquarium`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAcquariums(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAcquariums();
  }, []);

  function setShowLogHandler() {
    setShowlog(!showlog);
  }

  return (
    <div>
      <h1>Acquariums page</h1>
      <AddAcquarium refreshAcquariums={getAcquariums} />
      {acquariums.map((item) => (
        <div>
          <button onClick={setShowLogHandler} key={item._id}>
            <p>{item.name}</p>
          </button>
          <div>
            {showlog ? <p>Hi from log {item.log}</p> : <p>Add a log</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AcquariumPage;

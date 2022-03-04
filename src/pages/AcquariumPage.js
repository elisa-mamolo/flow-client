import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAcquarium from "../components/AddAcquarium";
const API_URL = "http://localhost:5005";

function AcquariumPage(state) {
  const [acquariums, setAcquariums] = useState([]);
  const [showlog, setShowlog] = useState(false);

  useEffect(() => {
    const getAcquariums = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/acquarium`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAcquariums(response.data);
        })
        .catch((error) => console.log(error));
    };
    getAcquariums();
  }, []);

  const deleteAcquarium = (id) => {
    axios
      .delete(`${API_URL}/acquarium/${id}`)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  function setShowLogHandler() {
    setShowlog(!showlog);
  }

  return (
    <div>
      <h1>Acquariums page</h1>
      {/* <AddAcquarium refreshAcquariums={getAcquariums} /> */}
      <AddAcquarium></AddAcquarium>
      {acquariums.map((item) => (
        <div key={item._id}>
          <button onClick={setShowLogHandler}>
            <p>{item.name}</p>
          </button>
          <button onClick={() => deleteAcquarium(item._id)}>Delete</button>
          <Link to={`/edit-acquarium/${item._id}`}>
            <button>Edit</button>
          </Link>
          <div>
            {showlog ? (
              <p>Hi from log {item.log}</p>
            ) : (
              <Link to={`/addlog/${item._id}`}>
                <button>Add Log</button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AcquariumPage;

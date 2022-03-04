import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAcquarium from "../components/AddAcquarium";
import LogRow from "../components/LogRow";

const API_URL = "http://localhost:5005";

function AcquariumPage(props) {
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
      {acquariums && (
        <div>
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
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <th>timestamp</th>
                          <th>alkalinity</th>
                          <th>ammonia</th>
                          <th>calcium</th>
                          <th>magnesium</th>
                          <th>nitrate</th>
                          <th>nitrite</th>
                          <th>ph</th>
                          <th>phosphate</th>
                          <th>salinity</th>
                          <th>temperature</th>
                        </tr>
                        {item.logs.map((item) => (
                          <LogRow logRow={item.measurements} />
                        ))}
                      </tbody>
                    </table>
                    <Link to={`/addlog/${item._id}`}>
                      <button>Add Log</button>
                    </Link>
                  </div>
                ) : (
                  <Link to={`/addlog/${item._id}`}>
                    <button>Add Log</button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AcquariumPage;

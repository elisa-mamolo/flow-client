import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AddAcquarium from "../components/AddAcquarium";
import LogRow from "../components/LogRow";
import { Button, Card, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5005";

function AcquariumPage(props) {
  const [acquariums, setAcquariums] = useState([]);
  const [showlog, setShowlog] = useState(false);
  const [showAddAcquarium, setShowAddAcquarium] = useState(false);

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
      <NavBar />
      <h1>Your Acquariums</h1>
      {/* <AddAcquarium refreshAcquariums={getAcquariums} /> */}

      {acquariums && (
        <div>
          {acquariums.map((item) => (
            <div key={item._id}>
              <Card style={{ width: "18rem" }} onClick={setShowLogHandler}>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBwgIDQcIBwgIDQ0ICAcHBw8IDQgNFREWFhURFRMYHSggGBolGxMTITEhJSkrPi4uFx8zODMtQygtNSsBCgoKBgYFDg8PDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALgBEwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAdEAEAAQQDAQAAAAAAAAAAAAAAEQEhQWFRofGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMNAAAAAAAAAAAAAAAAAAWtZ2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuN8oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuJ6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABa2zM3sgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALiZ+cggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALSk+wCAAAAAAAAAAAAAAAAAAqAAAAAAAAptAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k="
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text></Card.Text>
                  <Button onClick={() => deleteAcquarium(item._id)}>
                    Delete
                  </Button>
                  <Link to={`/edit-acquarium/${item._id}`}>
                    <Button>Edit</Button>
                  </Link>
                </Card.Body>
              </Card>

              <div>
                {showlog ? (
                  <div>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <th>Date</th>
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
                        {item.logs.map((log) => (
                          <LogRow
                            logRow={log.measurements}
                            logRowAcquarium={log.acquarium}
                            logRowId={log._id}
                            key={log._id}
                          />
                        ))}
                      </tbody>
                    </Table>
                    <Link to={`/addlog/${item._id}`}>
                      <Button>Add Log</Button>
                    </Link>
                  </div>
                ) : (
                  <Link to={`/addlog/${item._id}`}>
                    <Button>Add Log</Button>
                  </Link>
                )}
                <Button onClick={() => setShowAddAcquarium(!showAddAcquarium)}>
                  Add Acquarium
                </Button>
                {showAddAcquarium ? <AddAcquarium /> : <p></p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AcquariumPage;

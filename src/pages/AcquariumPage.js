import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddAcquarium from "../components/AddAcquarium";
import LogRow from "../components/LogRow";
import Moment from "moment";
import {
  Button,
  Card,
  Container,
  Navbar,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth.context";

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
      <h1 className="titles">Your Acquariums</h1>

      {acquariums && (
        <div>
          <Container>
            <Row xs={1} md={4} lg={12}>
              <Col lg={2}>
                <Button onClick={() => setShowAddAcquarium(!showAddAcquarium)}>
                  Add Acquarium
                </Button>
              </Col>
              <Col>
                {acquariums.map((item) => (
                  <div key={item._id}>
                    <Card
                      style={{ width: "18rem" }}
                      onClick={setShowLogHandler}
                    >
                      <Card.Img
                        variant="top"
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBwgIDQcIBwgIDQ0ICAcHBw8IDQgNFREWFhURFRMYHSggGBolGxMTITEhJSkrPi4uFx8zODMtQygtNSsBCgoKBgYFDg8PDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALgBEwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAdEAEAAQQDAQAAAAAAAAAAAAAAEQEhQWFRofGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMNAAAAAAAAAAAAAAAAAAWtZ2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuN8oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuJ6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABa2zM3sgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALiZ+cggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALSk+wCAAAAAAAAAAAAAAAAAAqAAAAAAAAptAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k="
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                          Started: {Moment(item.started).format("d MMM YYYY")}
                        </Card.Text>
                        <Card.Text>Liters: {item.liters}</Card.Text>

                        <Link to={`/edit-acquarium/${item._id}`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button onClick={() => deleteAcquarium(item._id)}>
                          Delete
                        </Button>
                        <br></br>
                        <Link to={`/addlog/${item._id}`}>
                          <Button className="mt-2">Add Log</Button>
                        </Link>
                        <Link to={`/charts/${item._id}`}>
                          <Button className="mt-2">Charts</Button>
                        </Link>
                      </Card.Body>
                    </Card>

                    {showAddAcquarium ? <AddAcquarium /> : <p></p>}
                  </div>
                ))}
              </Col>
              <Col>
                {acquariums.map((item) => (
                  <div>
                    {showlog && (
                      <div>
                        <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <th>Date</th>
                              <th>Alkalinity</th>
                              <th>Ammonia</th>
                              <th>Calcium</th>
                              <th>Magnesium</th>
                              <th>Nitrate</th>
                              <th>Nitrite</th>
                              <th>Ph</th>
                              <th>Phosphate</th>
                              <th>Salinity</th>
                              <th>Temperature</th>
                              <th>Actions</th>
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
                      </div>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default AcquariumPage;

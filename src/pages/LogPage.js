import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Form, FormCheck, Label, Table } from "react-bootstrap";
import NavBarComponent from "../components/NavBar";
import LogRow from "../components/LogRow";

const API_URL = "https://flow-acquarium-app.herokuapp.com";
function LogPage(props) {
  const [acquarium, setAcquarium] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    const getAcquariums = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/acquarium/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          let dataArray = [];
          setAcquarium(response.data);
          let logsArray = response.data.logs;
          logsArray.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
              console.log(logsArray);
              if (key === "measurements") {
                obj[key].forEach((value) => {
                  dataArray.push(value);
                });
              }
            });
          });
          setData(dataArray);
        })
        .catch((error) => console.log(error));
    };
    getAcquariums();
  }, []);

  return (
    <section className="background">
      <NavBarComponent />

      {!isLoggedIn && (
        <div className="alert alert-danger" role="alert">
          Log in to see logs!
        </div>
      )}

      {
        (acquarium,
        isLoggedIn && (
          <div>
            <Table striped bordered hover>
              <tbody className="tableStyle">
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
                {data.map((log) => (
                  <LogRow
                    logRow={data}
                    logRowAcquarium={acquarium}
                    logRowId={acquarium.logs[0]._id}
                    key={log._id}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        ))
      }

      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>
  );
}

export default LogPage;

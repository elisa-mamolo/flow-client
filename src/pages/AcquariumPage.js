import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddAcquarium from "../components/AddAcquarium";
import Moment from "moment";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://flow-acquarium-app.herokuapp.com";

function AcquariumPage(props) {
  const [acquariums, setAcquariums] = useState([]);
  const [showAddAcquarium, setShowAddAcquarium] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAcquariums = () => {
    if (isLoggedIn) {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/acquarium?userid=${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAcquariums(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getAcquariums();
  }, []);

  const deleteAcquarium = (id) => {
    axios
      .delete(`${API_URL}/acquarium/${id}`)
      .then(() => {
        navigate(`/acquarium`);
      })
      .catch((err) => console.log(err));
  };

  function handleTableVisibility() {
    setShowAddAcquarium(!showAddAcquarium);
  }

  return (
    <section className="background">
      <NavBar />
      {
        (acquariums,
        isLoggedIn && (
          <div>
            <div className="alert alert-primary" role="alert">
              Your Acquariums
              <br></br>
              <Button
                onClick={() => handleTableVisibility()}
                className="btn-custom-color"
              >
                Add Acquarium
              </Button>
            </div>
            {showAddAcquarium && (
              <AddAcquarium
                refreshAcquariums={(getAcquariums, handleTableVisibility)}
              ></AddAcquarium>
            )}
            <div className="container">
              <div className="row">
                {acquariums.map((item) => (
                  <div className="card-container col-sm-12 col-md-6 col-lg-4">
                    <Link to={`/log/${item._id}`} key={item._id}>
                      <div className="card-custom">
                        <div className="card-img">
                          <img src="https://content.invisioncic.com/Mnanoreef/monthly_2021_01/January-2021-Featured-Reef-Profile-FTS.jpg.355629df8744c3da4e829bfc26bd05bc.jpg" />
                        </div>
                        <div className="card-content">
                          <h2 className="big-title">{item.name}</h2>
                          <h3 className="medium-title">
                            Started: {Moment(item.started).format("d MMM YYYY")}
                          </h3>
                          <h3 className="medium-title">
                            Liters: {item.liters}
                          </h3>
                          <div className="d-flex justify-content-around mt-3 button-holder">
                            <Link to={`/edit-acquarium/${item._id}`}>
                              <Button className="mt-2 btn-custom-color">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              onClick={() => deleteAcquarium(item._id)}
                              className="mt-2 btn-custom-color"
                            >
                              Delete
                            </Button>
                            <Link to={`/addlog/${item._id}`}>
                              <Button className="mt-2 btn-custom-color">
                                +Log
                              </Button>
                            </Link>
                            <Link to={`/log/${item._id}`}>
                              <Button className="mt-2 btn-custom-color">
                                Logs
                              </Button>
                            </Link>
                            <Link to={`/charts/${item._id}`}>
                              <Button className="mt-2 btn-custom-color">
                                Charts
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      }

      {!isLoggedIn && (
        <div className="alert alert-danger" role="alert">
          Log in to see acquariums!
        </div>
      )}
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>
  );
}

export default AcquariumPage;

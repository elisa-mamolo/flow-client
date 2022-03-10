import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Button, Form, FormCheck, Label } from "react-bootstrap";
import NavBarComponent from "../components/NavBar";

const API_URL = "https://flow-acquarium-app.herokuapp.com";
function LogPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logid, acquariumid } = useParams();
  const [log, setLog] = useState(logid);

  useEffect(() => {
    const getLog = () => {
      // Send the token through the request "Authorization" Headers
      axios
        .get(`${API_URL}/log/${logid}`)
        .then((response) => {
          console.log(response);
          setLog(response);
        })
        .catch((error) => console.log(error));
    };
    getLog();
  }, []);

  return (
    <section className="background">
      <NavBarComponent />
      <div className="alert alert-primary" role="alert">
        This is a primary alert—check it out!
      </div>

      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>
  );
}

export default LogPage;

import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";

function HomePage(props) {
  return (
    <section className="background">
      <NavBar />
      <div className="container centered">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Link to={`/acquarium`}>
              <div className="card cardhome blue-gradient">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <h5 className="card-title">Acquariums</h5>
                  <p className="card-text"></p>
                </div>
                <svg
                  id="wave"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1166 398.67"
                >
                  <path
                    className="cls-1"
                    d="M0,200s394-327,703,0,683,0,693,0V450H0Z"
                    transform="translate(0 -41.33)"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Link to={`/acquarium`}>
              <div className="card cardhome blue-gradient">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <h5 className="card-title">About Us</h5>
                  <p className="card-text"></p>
                </div>
                <svg
                  id="wave"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1166 398.67"
                >
                  <path
                    className="cls-1"
                    d="M0,200s394-327,703,0,683,0,693,0V450H0Z"
                    transform="translate(0 -41.33)"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <Link to={`/acquarium`}>
              <div className="card cardhome blue-gradient">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                  <h5 className="card-title">Reef Learn</h5>
                  <p className="card-text"></p>
                </div>
                <svg
                  id="wave"
                  data-name="Layer 2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1166 398.67"
                >
                  <path
                    className="cls-1"
                    d="M0,200s394-327,703,0,683,0,693,0V450H0Z"
                    transform="translate(0 -41.33)"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>
  );
}

export default HomePage;

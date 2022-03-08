import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";

function HomePage(props) {
  return (
    <div>
      <NavBar />
      <h2>Home</h2>
      <Link to={`/acquarium`}>
        <Button>Acquarium</Button>
      </Link>
      <Link to={`/charts`}>
        <Button>Charts</Button>
      </Link>
    </div>
  );
}

export default HomePage;

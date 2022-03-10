import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { Button } from "react-bootstrap";

const API_URL = process.env.SERVER || "http://localhost:5005";

function LogRow(props) {
  const navigate = useNavigate();

  const deleteLog = (logid, acquariumid) => {
    axios
      .delete(`${API_URL}/log/${logid}/${acquariumid}`)
      .then(() => {
        //navigate(`/log/${acquariumid}`);
        navigate(`/acquarium`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {" "}
      {props.logRow &&
        props.logRow.map((item) => {
          return (
            <tr key={item._id}>
              <td>
                <p>{Moment(item.timestamp).format("DD MMM YYYY")}</p>
              </td>
              <td>
                <p>{item.alkalinity}</p>
              </td>
              <td>
                <p>{item.ammonia}</p>
              </td>
              <td>
                <p>{item.calcium}</p>
              </td>
              <td>
                <p>{item.magnesium}</p>
              </td>
              <td>
                <p>{item.nitrate}</p>
              </td>
              <td>
                <p>{item.nitrite}</p>
              </td>
              <td>
                <p>{item.ph}</p>
              </td>
              <td>
                <p>{item.phosphate}</p>
              </td>
              <td>
                <p>{item.salinity}</p>
              </td>
              <td>
                <p>{item.temperature}</p>
              </td>
              <td>
                <Link
                  to={`/edit-log/${props.logRowId}/${props.logRowAcquarium._id}`}
                >
                  <Button>Edit</Button>
                </Link>
                <Button
                  className="mt-2"
                  onClick={() =>
                    deleteLog(props.logRowId, props.logRowAcquarium._id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
    </>
  );
}

export default LogRow;

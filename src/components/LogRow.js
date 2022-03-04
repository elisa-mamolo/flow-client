import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005";

function LogRow(props) {
  const deleteLog = (logid, acquariumid) => {
    axios
      .delete(`${API_URL}/log/${logid}/${acquariumid}`)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return props.logRow.map((item) => {
    return (
      <tr key={item._id}>
        <td>
          <p>{item.timestamp}</p>
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
          <button
            onClick={() => deleteLog(props.logRowId, props.logRowAcquarium)}
          >
            Delete
          </button>

          <Link to={`/edit-log/${props.logRowId}/${props.logRowAcquarium}`}>
            <button>Edit</button>
          </Link>
        </td>
      </tr>
    );
  });
}

export default LogRow;

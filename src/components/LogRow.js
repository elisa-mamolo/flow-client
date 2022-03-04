import { useState } from "react";

function LogRow(props) {
  //console.log(props);
  return props.logRow.map((item) => {
    console.log(item);
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
          <button onClick={() => {}} className="btn-delete">
            Delete
          </button>
          <button onClick={() => {}}>Edit</button>
        </td>
      </tr>
    );
  });
}

export default LogRow;

import React, { PropTypes } from "react";
import { Link } from "react-router";

const CheapFlightsListRow = ({ cheapflight }) => {
  return (
    <tr>
      <td>{cheapflight.cmsPageId}</td>
      <td>{cheapflight.destinationName}</td>
      <td>{cheapflight.typeOf}</td>
      <td>{cheapflight.noOfDestinations}</td>
      <td>{cheapflight.noOfFlights}</td>
      <td>{cheapflight.user}</td>
      <td>
        <span className="dropdown">
          <button className="btn">options</button>
          <label>
            <input type="checkbox" />
            <ul>
              <li>
                <Link to={"/cheapflight/" + cheapflight.id}>
                  Edit Destination
                </Link>
              </li>
              <li>Edit Fare Rules</li>
            </ul>
          </label>
        </span>
      </td>
    </tr>
  );
};

CheapFlightsListRow.propTypes = {
  cheapflight: PropTypes.object.isRequired
};

export default CheapFlightsListRow;

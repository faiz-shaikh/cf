import React, {PropTypes} from 'react';
import CheapFlightsListRow from './CheapFlightsListRow';

const CheapFlightsList = ({cheapflights}) => {
  return (
    <table className="paymentFormsTable">
      <thead>
      <tr>
        <th className="paymentFormId">id#</th>
        <th>Destination Name</th>
        <th>Type</th>
        <th># of Destinations</th>
        <th># of Flights</th>
        <th>User</th>
        <th> </th>
      </tr>
      </thead>
      <tbody>
      {cheapflights.map(cheapflight =>
        <CheapFlightsListRow key={cheapflight.id} cheapflight={cheapflight}/>
      )}
      </tbody>
    </table>
  );
};

CheapFlightsList.propTypes = {
  cheapflights: PropTypes.array.isRequired
};

export default CheapFlightsList;

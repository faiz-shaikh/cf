/**
*
* OfferNumber
*
*/

import React, { PropTypes } from 'react';
const Timestamp = require('react-timestamp');

function OfferNumber(props) {
  OfferNumber.propTypes = {
    firstObjectFromData: PropTypes.object,
    date: PropTypes.number,
  };

  function timeconverter() {
    return props.date / 1000;
  }


  return (
    <div>
      <p><span className="bold" id="intro-manual-offers-live">{props.firstObjectFromData.numberFlights}</span> manual flight offers live</p>
      <span className="smallerFont">last updated: </span><span id="intro-manual-time"><Timestamp time={timeconverter()} format="date" /></span> , <span id="intro-time-off-upload"><Timestamp time={timeconverter()} format="time" />,</span>
    </div>
  );
}


export default OfferNumber;

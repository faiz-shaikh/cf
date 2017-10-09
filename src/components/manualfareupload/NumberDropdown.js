/**
*
* NumberDropdown
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

function NumberDropdown(props) {
  const { num } = props; //eslint-disable-line

  NumberDropdown.PropTypes = {
    num: PropTypes.number
  };

  return (
    <option value={num} >{num}</option>
  );
}

export default NumberDropdown;

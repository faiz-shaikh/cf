import React, { PropTypes } from 'react';
// import styled from 'styled-components';


function Button(props) {
    // Render an anchor tag
  return (
    <a className={props.className} id={props.id} href={props.href}>
      {props.value}
    </a>
  );
}


Button.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string
};

export default Button;
/**
*
* UserRole
*
*/

import React, { PropTypes } from 'react';
import ButtonUpload from './ButtonUpload';
import ButtonDownload from './ButtonDownload';


function UserRole(props) {
  const user = document.getElementById('roleName').value;

const userPerm = () => (user === 'editor') ? <span><ButtonDownload filename={props.pos()} /><ButtonUpload action={props.action} /></span> : null; //eslint-disable-line

  return userPerm();
}

UserRole.propTypes = {
  //UserRole: PropTypes.func,
};

export default UserRole;

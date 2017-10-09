/**
*
* DownloadButton
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import Button from './Button';
import serverUrl from '../../env-config/sta-dev';


function ButtonDownload(props) { // eslint-disable-line react/prefer-stateless-function
  const url = `${serverUrl.SERVERURL}/manualupload/download/${props.filename}`;
  return (
    <Button className="btn linkBtn" id="download-csv" href={url} value="Download CSV" />
  );
}


ButtonDownload.propTypes = {
  filename: PropTypes.string
};

export default ButtonDownload;

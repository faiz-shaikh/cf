/**
*
* ButtonUpload
*
*/

import React from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import localisation from './localisation';
import serverUrl from '../../env-config/sta-dev';
class ButtonUpload extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    handleUpload(props) {
    const body = document.getElementsByTagName('body')[0];
    const fn = this.props;
    const createDOMElement = (elementTag) => document.createElement(elementTag); // create dom element

    // confirm box when closing the lightbox
    const confirmClose = () => confirm('Are you sure you want to cancel?') ? body.removeChild(wrapper) : false;

    const lightboxClose = () => body.removeChild(wrapper); // lightbox close without confirmation

    let wrapper = createDOMElement('div');
    const el = createDOMElement('div');
    el.setAttribute('class', 'cover');
    const lightbox = createDOMElement('div');
    wrapper.appendChild(el);
    lightbox.innerHTML = `<div class="light-box">${localisation.lightboxUpload}</div>`;
    wrapper.appendChild(lightbox);
    body.appendChild(wrapper);
    const cancel = document.getElementById('upload-csv-cancel');
    cancel.addEventListener('click', confirmClose);
    const uploadFile = document.getElementById('upload-file-csv');
    const whatPos = () => {
      const pos = document.getElementById('posDropdown');
      const sel = pos.children.value;
      return sel.options[sel.selectedIndex].innerHTML.toLowerCase();
    };

    uploadFile.onchange = function (e) {
      const filename = this.value.split('\\').filter((x) => /.csv?/i.test(x));
      const regpattern = /(\.csv)$/i;

      const files = e.target.files || e.dataTransfer.files;

      if (!files.length || !regpattern.test(filename)) {
        lightbox.innerHTML = `<div class="light-box">${localisation.fileExtensionError}</div>`;
        const wrongFormatCancel = document.getElementById('wrong-format-cancel');
        wrongFormatCancel.addEventListener('click', lightboxClose);
      } else {
        const timestamp = new Date();
        const data = new FormData();
        const fileName = document.getElementById('upload-file-csv').files[0].name;
        data.append('multipartFile', document.getElementById('upload-file-csv').files[0]);
        data.append('username', document.getElementsByClassName('userBox')[0].childNodes[1].childNodes[1].innerHTML);
        data.append('pos', whatPos());
        data.append('date', timestamp.getTime());
        axios.post(`${serverUrl.SERVERURL}manualupload/`, data)
        .then((res) => {
          lightbox.innerHTML = `<div class="light-box"><h2 class="success-heading">Upload successfull</h2><p>${res.data.data}</p><a href="#" class="btn btn-success btn-lg I" id="close-upload-successfull">Cancel</a><a href="#" id="publish-to-live" class="btn linkBtn" id="publish-to-live">Publish to live</a></div>`;
          const closeUploadSuccessfull = document.getElementById('close-upload-successfull');
          const publishToLive = document.getElementById('publish-to-live');
          publishToLive.addEventListener('click', () => axios.post(`${serverUrl.SERVERURL}manualupload/publish/${fileName}`, data).then((response) => {
            lightbox.innerHTML = `<div class="light-box"><h2 class="success-heading">${response.data.data}</h2>`;
            setTimeout(lightboxClose, 1500);

            fn.action(`${serverUrl.SERVERURL}history/manualupload/${whatPos()}`);
          }));
          closeUploadSuccessfull.addEventListener('click', lightboxClose);
        })
        .catch((err) => {
          const markup = `<ul>${err.response.data.data.map((x) => `<li>${x}</li>`).join('')}</ul>`;

          lightbox.innerHTML = `<div class="light-box"><div class="error-body"><h2 class="error-heading">Upload error</h2>${markup}<p>No changes have been applied</p><p>Please review the content of your file and try uploading again</p></div>
          <a href="#" class="btn btn-success btn-lg I" id="close-upload-error">Cancel</a>
          </div>`;
          const closeUploadError = document.getElementById('close-upload-error');
          closeUploadError.addEventListener('click', lightboxClose);
        });
      }
    };
    el.addEventListener('click', confirmClose);
  }

  render() {
    return (
        <a //eslint-disable-line
          className="btn linkBtn"
          id="uploadBtn"
          onClick={this.handleUpload.bind(this)} //eslint-disable-line
        >Upload</a>
    );
  }
}

export default ButtonUpload;

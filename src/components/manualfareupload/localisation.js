const localisation = {
    lightboxUpload: `<h2>Upload CSV</h2>
      By uploading a CSV file<br />
      all existing fares in the database will be replaced<br />
      by the content of the new file.<br />
      <form role="form" class="form" method="POST" onSubmit="uploadFile()">
      <a id="upload-csv-cancel" type="button" class="btn btn-success btn-lg I">Cancel</a>
      <label class="btn btn-success btn-lg" for="upload-file-csv">Select file</label>
      <input id="upload-file-csv" type="file" style="position:absolute;left:257px;top:270px;opacity:0;width:47%;z-index:0;" />
      </form>
      <div id="output" class="container"></div>`,
    loading: 'Please wait, your CSV file is now loading . . .',
    fileExtensionError: '<p>Only file with <strong>.csv</strong> extension</p><p>can be uploaded!</p><a id="wrong-format-cancel" type="button" class="btn btn-success btn-lg I">Cancel</a>',
    fileUploadSuccess: '<h2 class="success-heading">Upload successfull</h2><p>{#SERVERRESPONSE#}</p><a href="#" class="btn btn-success btn-lg I" id="close-upload-successfull">Cancel</a><a href="http://www.statravel.co.uk" class="btn linkBtn" id="publish-to-live">Publish to live</a>'
  };

  export default localisation;

import React, { PropTypes } from "react";

function myFunction() {
  document.getElementById("editUrl").disabled = false;

}
const TextInput = ({ name, label, onChange, placeholder, value, error, defaultValue }) => {
  let wrapperClass = "form-group row clearfix";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled
          id="editUrl"
          defaultValue={defaultValue}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <span className="editInputBtn" id="editUrlBtn" type="button" onClick={myFunction} />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.string
};

export default TextInput;

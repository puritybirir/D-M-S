import React, { PropTypes } from 'react';

const TextInput = ({ title, label, onChange, value, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += '' + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={title}>{label}</label>
      <div className="field">
        <input
          type="text"
          title={title}
          className="form-control"
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;

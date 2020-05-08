import React from 'react';

import './styles/OutlineTextBoxStyles.css';

import PropTypes, { bool } from 'prop-types';

function OutlineTextBox({ placeholder, value, onChangeText, toUpperCase }) {
  const handleChangeText = (event) => {
    const text = event.target.value;
    if (toUpperCase) {
      onChangeText(toUpper(text));
    } else {
      onChangeText(text);
    }
  };

  const toUpper = (textInput) => {
    return textInput.toUpperCase(); 
  };

  return (
    <div className="outline-box">
      <input className="outline-text"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => handleChangeText(event)}
      />
    </div>
  );
}

OutlineTextBox.defaultProps = {
  placeholder: 'Enter text here',
  value: '',
  toUpperCase: false, 
};

OutlineTextBox.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  toUpperCase: bool, 
};

export default OutlineTextBox;

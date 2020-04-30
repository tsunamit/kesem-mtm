import React from 'react';

import PropTypes from 'prop-types';

function OutlineTextBox({ placeholder, value, onChangeText }) {
  const handleChangeText = (event) => {
    const text = event.target.value;
    onChangeText(text);
  };

  return (
    <div>
      <input
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
};

OutlineTextBox.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
};

export default OutlineTextBox;

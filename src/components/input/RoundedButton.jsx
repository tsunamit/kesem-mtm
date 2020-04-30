import React from 'react';

import PropTypes from 'prop-types';

function RoundedButton({ onClick }) {
  return (
    <button type="button" onClick={() => onClick()}>
      <p>click me</p>
    </button>
  );
}

RoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RoundedButton;

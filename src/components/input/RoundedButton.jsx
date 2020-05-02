import React from 'react';

import PropTypes from 'prop-types';

function RoundedButton({ title, onClick }) {
  return (
    <button type="button" onClick={() => onClick()}>
      <p>{title}</p>
    </button>
  );
}

RoundedButton.defaultProps = {
  title: '',
};

RoundedButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default RoundedButton;

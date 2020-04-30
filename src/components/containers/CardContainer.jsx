import React from 'react';
import PropTypes from 'prop-types';

import './styles/CardContainerStyles.css';

function CardContainer({ children }) {
  return (
    <div id="card-container">
      { children }
    </div>
  );
}

export default CardContainer;

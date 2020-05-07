import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import './styles/PaddleActivityContainerStyles.css'; 

const paddleLogMessage = (screenName, amountPledged) => (
  `${screenName} just raised for ${amountPledged}`
);

function PaddleActivityContainer({ sessionPaddles }) {
  const totalPaddlesRaised = sessionPaddles.length;

  return (
    <div className="paddle-activity-container">
      <div className="paddle-activity-header">
        {totalPaddlesRaised}  paddles raised
      </div>
      <div className="paddle-activity-message-container-extra-wrapper">
        <div className="paddle-activity-message-container">
          {sessionPaddles.map((paddle) => (
            <div className="paddle-activity-message" key={paddle.screenName + paddle.amountPledged.toString()}>
              {paddleLogMessage(paddle.screenName, paddle.amountPledged)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PaddleActivityContainer.propTypes = {
  sessionPaddles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      screenName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      amountPledged: PropTypes.number.isRequired,
      createdAt: PropTypes.shape({
        nanoseconds: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaddleActivityContainer;

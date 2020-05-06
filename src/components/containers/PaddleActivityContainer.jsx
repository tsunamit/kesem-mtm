import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import CardContainer from './CardContainer';

const paddleLogMessage = (screenName, amountPledged) => (
  `${screenName} just raised for ${amountPledged}`
);

function PaddleActivityContainer({ sessionPaddles }) {
  const totalPaddlesRaised = sessionPaddles.length;

  return (
    <div>
      <h2>{totalPaddlesRaised} paddles raised</h2>
      <hr />
      {sessionPaddles.map((paddle) => (
        <p key={paddle.screenName + paddle.amountPledged.toString()}>
          {paddleLogMessage(paddle.screenName, paddle.amountPledged)}
        </p>
      ))}
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

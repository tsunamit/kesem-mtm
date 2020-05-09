import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { paddleSessionTypes, paddleDataModel } from '../../constants/model';

import './styles/PaddleActivityContainerStyles.css'; 

const paddleRaisedMessage = (screenName, amountPledged) => (
  `${screenName} just raised for $${amountPledged}!`
);

const paddleRaiseMessageInsert = " just raised for ";
const JOINED_PADDLE_RAISE_MESSAGE = ' joined the paddle raise';

function PaddleActivityContainer({ sessionPaddles }) {
  const totalPaddlesRaised = sessionPaddles.length;

  const mapActivityToComponents = () => {
    return sessionPaddles.map((paddleActivityItem) => {
      // For some reason, a newly created item has no timestamp initially. So we
      // need to give it the maximum number to preserve correct ordering
      const componentKey = (paddleActivityItem[paddleDataModel.createdAt]) == null
        ? Number.MAX_SAFE_INTEGER
        : paddleActivityItem[paddleDataModel.createdAt].seconds;

      switch (paddleActivityItem.type) {
        // Paddle raised message
        case paddleSessionTypes.paddle: {
          return (
            <div className="paddle-activity-message" key={componentKey}>
              <b>{paddleActivityItem[paddleDataModel.screenName]}</b>
              {paddleRaiseMessageInsert}
              <b>${paddleActivityItem[paddleDataModel.amountPledged]}</b>
            </div>
          );
        }
        // Someone joined the paddle raise
        case paddleSessionTypes.joinNotification: {
          return (
            <div className="paddle-activity-message" key={componentKey}>
              <b>{paddleActivityItem[paddleDataModel.screenName]}</b>
              {JOINED_PADDLE_RAISE_MESSAGE}
            </div>
          );
        }
        default:
          break;
      }
    });
  };

  return (
    <div className="paddle-activity-container">
      <div className="paddle-activity-header">
        {totalPaddlesRaised} total paddles raised!
      </div>
      <div className="paddle-activity-message-container-extra-wrapper">
        <div className="paddle-activity-message-container">
          {mapActivityToComponents()}
          {/* {sessionPaddles.map((paddle) => (
            <div className="paddle-activity-message" key={paddle.screenName + paddle.amountPledged.toString()}>
              <b>{paddle.screenName} </b>
              {paddleRaiseMessageInsert}
              <b>${paddle.amountPledged}</b>!
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

PaddleActivityContainer.propTypes = {
  // sessionPaddles: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string.isRequired,
  //     screenName: PropTypes.string.isRequired,
  //     email: PropTypes.string.isRequired,
  //     amountPledged: PropTypes.number.isRequired,
  //     createdAt: PropTypes.shape({
  //       nanoseconds: PropTypes.number.isRequired,
  //       seconds: PropTypes.number.isRequired,
  //     }).isRequired,
  //   }).isRequired,
  // ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaddleActivityContainer;

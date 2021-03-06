import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from '../firebase/context';

import { paddleDataModel } from '../../constants/model';

import './styles/PaddleActivityContainerStyles.css';
import Firebase from '../firebase/firebase';
import heart_thin from '../../images/heart-thin.png'
import heart_thick from '../../images/heart-thick.png'
const paddleRaisedMessage = (screenName, amountPledged) => (
  `${screenName} just raised for $${amountPledged}!`
);

const paddleRaiseMessageInsert = " just raised for  ";
const JOINED_PADDLE_RAISE_MESSAGE = ' joined the paddle raise';

function PaddleActivityItem({
  paddleId, screenName, amountPledged,
  hearts, firebase, sessionId
}) {
  const [userDidLike, setUserDidLike] = useState(false);
  const [heartImg, setHeartImg] = useState(heart_thin);

  const onPressLike = async () => {
    if (userDidLike) {
      await firebase.unlikePaddleRaise(paddleId, sessionId);
      setHeartImg(heart_thin);
      setUserDidLike(false);
    } else {
      await firebase.likePaddleRaise(paddleId, sessionId);
      setHeartImg(heart_thick);
      setUserDidLike(true);
    }
  };


  return (
    <div className="paddle-activity-message" key={paddleId}>
      <div className="text-first-part"> 
        <b>{screenName} </b>
        {paddleRaiseMessageInsert}
        <b>${amountPledged}!</b>
      </div>
      <div className="heart-icon-container">
        <div className="heart-icon-counter">
          {`${hearts}`}
        </div>
        <input className="heart-icon-img" type="image" src={heartImg} onClick={() => onPressLike()}/>
      </div>
    </div>
  );
}

function PaddleActivityContainer({ sessionPaddles, sessionId }) {
  const totalPaddlesRaised = sessionPaddles.length;

  return (
    <div className="paddle-activity-container">
      <div className="paddle-activity-header">
        {totalPaddlesRaised} total paddles raised!
      </div>
      <div className="paddle-activity-message-container-extra-wrapper">
        <div className="paddle-activity-message-container">
          {sessionPaddles.map((paddle) => (
            <FirebaseContext.Consumer>
              {(firebase) => (
                <PaddleActivityItem
                  paddleId={paddle.id}
                  screenName={paddle[paddleDataModel.screenName]}
                  amountPledged={paddle[paddleDataModel.amountPledged]}
                  hearts={paddle[paddleDataModel.hearts]}
                  firebase={firebase}
                  sessionId={sessionId}
                />
              )}
            </FirebaseContext.Consumer>
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
      hearts: PropTypes.number.isRequired,
      createdAt: PropTypes.shape({
        nanoseconds: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default PaddleActivityContainer;

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

function PaddleActivityContainer({ firebase, sessionId, user }) {
  // TODO properly handle unsubscribe paddles
  let unsubscribePaddles; // call later in destructor to clean up subscription to paddle feed
  console.log('sessionId: ', sessionId);
  console.log('user', user);

  const [sessionPaddles, setSessionPaddles] = useState([]);

  const subscribeToPaddles = () => {
    unsubscribePaddles = firebase.subscribeToPaddles(
      sessionId,
      (querySnapshot) => {
        setSessionPaddles(querySnapshot.docs.map((doc) => doc.data()));
      },
    );
  };

  // Run at beginning. Returns the destructor function
  useEffect(() => {
    subscribeToPaddles();
    return (() => unsubscribePaddles());
  }, []);

  useEffect(() => {
    console.log(sessionPaddles);
  }, [sessionPaddles]);

  return (
    <div>
      <h2>Paddles</h2>
      {sessionPaddles.map((paddle) => (
        <p>
          Name: {paddle.name}, Email: {paddle.email}, Pledge: ${paddle.amountPledged} 
        </p>
      ))}
      <hr />
    </div>
  );
}

PaddleActivityContainer.propTypes = {
  sessionId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaddleActivityContainer;

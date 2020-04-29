import React, { useState, useEffect } from 'react';

function PaddleActivityContainer({ firebase, sessionId }) {
  let unsubscribePaddles; // call later in destructor to clean up subscription to paddle feed

  const [sessionPaddles, setSessionPaddles] = useState([]);

  const subscribeToPaddles = () => {
    unsubscribePaddles = firebase.subscribeToPaddles(
      sessionId,
      (querySnapshot) => {
        setSessionPaddles(querySnapshot.docs.map((doc) => doc.data()));
      },
    );
  };

  const addPaddle = () => {
    console.log('adding paddle');
    firebase.addPaddle('newfuncwhodis', 'new@new.com', 20, 'test')
      .then(() => {
        console.log('done adding paddle');
      });
  }

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
      <button onClick={async () => addPaddle()}>
        <p>Add Paddle</p>
      </button>
    </div>
  );
}

export default PaddleActivityContainer;

import React, { useState, useEffect } from 'react';
import FirebaseContext from '../../firebase/context';

function PaddleActivityLog({ firebase, sessionId }) {
  const [sessionPaddles, setSessionPaddles] = useState([]);

  const getPaddlesCollection = async () => {
    let paddlesCollectionSnapshot = await firebase.paddlesCollection(sessionId).get();
    console.log(paddlesCollectionSnapshot.docs);
  }

  const subscribeToPaddles = () => {
    let unsubscribePaddles = firebase.paddlesCollection(sessionId).onSnapshot(
      (querySnapshot) => {
        setSessionPaddles(querySnapshot.docs.map((doc) => doc.data()));
      }
    );
  }

  const addPaddle = () => {
    console.log('adding paddle');
    firebase.paddlesCollection(sessionId).add({
      name: 'testuser',
      email: 'test@test.com',
      amountPledged: 10,
    })
    .then(() => {
      console.log('done adding paddle');
    })
  }

  // Run at beginning
  useEffect(() => {
    subscribeToPaddles();     
  }, []);

  useEffect(() => {
    console.log(sessionPaddles);
  }, [sessionPaddles])

  return (
    <div>
      <h2>Paddles</h2>
      <button onClick={async () => await addPaddle()}>
        <p>Add Paddle</p>
      </button>
    </div>
  );
}

function PaddlePage() {

  return (
    <div>
      <h1>Paddle Page</h1>
      <FirebaseContext.Consumer>
        {(firebase) => <PaddleActivityLog firebase={firebase} sessionId="test" />}
      </FirebaseContext.Consumer>
    </div>
  )
}

export default PaddlePage;
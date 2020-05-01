import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FirebaseContext from '../firebase/context';
import PaddleActivityContainer from '../containers/PaddleActivityContainer';

function PaddleSessionPage() {
  // use router history to access passes state
  const routerHistory = useHistory();

  const [user, setUser] = useState({
    name: '',
    email: '',
    screenName: '',
  });
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const routerState = routerHistory.location.state;
    setUser({
      name: routerState.name,
      email: routerState.email,
      screenName: routerState.screenName,
    });
    setSessionId(routerState.sessionId);
  }, []);

  return (
    <div>
      <h1>Paddle Page</h1>
      {
        sessionId !== ''
          ? (
            <FirebaseContext.Consumer>
              {(firebase) => (
                <PaddleActivityContainer
                  firebase={firebase}
                  sessionId={sessionId}
                  user={user}
                />
              )}
            </FirebaseContext.Consumer>
          )
          : null
      }
    </div>
  );
}

export default PaddleSessionPage;

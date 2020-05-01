import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FirebaseContext from '../firebase/context';
import PaddleActivityContainer from '../containers/PaddleActivityContainer';
import PaddlePledgeContainer from '../containers/PaddlePledgeContainer';

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
    // TODO get session ID from the URL
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
                <div>
                  <PaddleActivityContainer
                    firebase={firebase}
                    sessionId={sessionId}
                    user={user}
                  />

                  <br />

                  <PaddlePledgeContainer
                    firebase={firebase}
                    sessionId={sessionId}
                    user={user}
                    // TODO fetch this number from the server
                    currentPledgeAmount={20}
                  />
                </div>
              )}
            </FirebaseContext.Consumer>
          )
          : null
      }
    </div>
  );
}

export default PaddleSessionPage;

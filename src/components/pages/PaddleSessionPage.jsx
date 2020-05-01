import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import PaddleActivityContainer from '../containers/PaddleActivityContainer';
import PaddlePledgeContainer from '../containers/PaddlePledgeContainer';
import PaddlePledgeIndicator from '../containers/PaddlePledgeIndicator';


function PaddleSessionPage({ firebase, location }) {
  // use router history to access passes state
  const routerHistory = useHistory();

  // component state
  const [user, setUser] = useState({
    name: '',
    email: '',
    screenName: '',
  });
  const [sessionId, setSessionId] = useState('');
  const [sessionIsValid, setSessionIsValid] = useState(false);
  const [sessionData, setSessionData] = useState({
    currentPledgeAmount: 0,
    totalDonations: 0,
    donationGoal: 0,
    totalPaddlesRaised: 0,
    pledgeAmountSelections: [],
  });

  const onSessionUpdate = (sessionDocSnapshot) => {
    if (sessionDocSnapshot.exists) {
      setSessionIsValid(true);
    } else {
      setSessionIsValid(false);
      return;
    }

    setSessionData({
      currentPledgeAmount: sessionDocSnapshot.data().currentPledgeAmount,
      totalDonations: sessionDocSnapshot.data().totalDonations,
      donationGoal: sessionDocSnapshot.data().donationGoal,
      totalPaddlesRaised: sessionDocSnapshot.data().totalPaddlesRaised,
      pledgeAmountSelections: sessionDocSnapshot.data().pledgeAmountSelections,
    });
  };

  // on load
  useEffect(() => {
    // get user parameters from passed state
    const routerState = routerHistory.location.state;
    setUser({
      name: routerState.name,
      email: routerState.email,
      screenName: routerState.screenName,
    });

    // get session id from url
    const urlVars = queryString.parse(location.search);
    setSessionId(urlVars.sessionId);


    firebase.subscribeToSession(
      urlVars.sessionId,
      (sessionDocSnapshot) => onSessionUpdate(sessionDocSnapshot),
    );
  }, []);

  return (
    <div>
      <h1>Paddle Page</h1>
      {
        sessionIsValid
          ? (
            <div>
              <PaddlePledgeIndicator
                pledgeAmounts={sessionData.pledgeAmountSelections}
                currentPledgeAmount={sessionData.currentPledgeAmount}
              />
              <br />
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
                currentPledgeAmount={sessionData.currentPledgeAmount}
              />
            </div>
          ) : (
            <p>Session invalid</p>
          )
      }
    </div>
  );
}

PaddleSessionPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.func.isRequired,
  }).isRequired,
};

export default PaddleSessionPage;

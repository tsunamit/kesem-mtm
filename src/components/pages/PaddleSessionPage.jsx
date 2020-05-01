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

  // state
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
  const [sessionPaddles, setSessionPaddles] = useState([]);

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
      pledgeAmountSelections: sessionDocSnapshot.data().pledgeAmountSelections,
    });
  };

  const subscribeToPaddles = () => {
    // TODO set equal to unsubscribe function and call it in destructor
    firebase.subscribeToPaddles(
      sessionId,
      (querySnapshot) => {
        setSessionPaddles(querySnapshot.docs.map((doc) => doc.data()));
      },
    );
  };

  /**
   * execute when session is validated
   */
  useEffect(() => {
    if (sessionIsValid) {
      subscribeToPaddles();
    }
  }, [sessionIsValid]);

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
      {
        sessionIsValid
          ? (
            <div>
              <h1>[Picture]</h1>
              <h1>Big Hill Sponsor</h1>
              <h2>Provide Supplies For Virtual Camp</h2>
              <PaddlePledgeIndicator
                pledgeAmounts={sessionData.pledgeAmountSelections}
                currentPledgeAmount={sessionData.currentPledgeAmount}
              />
              <br />
              <PaddleActivityContainer
                sessionPaddles={sessionPaddles}
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

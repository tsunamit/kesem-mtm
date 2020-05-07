import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import PaddleActivityContainer from '../containers/PaddleActivityContainer';
import PaddlePledgeContainer from '../containers/PaddlePledgeContainer';
import PaddlePledgeIndicator from '../containers/PaddlePledgeIndicator';
import DonationProgressBar from '../containers/DonationProgressBar';

import img_1 from '../../images/kesem-2.jpg'

import './styles/PaddleSessionPageStyles.css'

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
    donationTotal: 0,
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
      donationTotal: sessionDocSnapshot.data().donationTotal,
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
            <div >
              <DonationProgressBar
                currentDonationTotal={sessionData.donationTotal}
                donationGoal={sessionData.donationGoal}
              />
              <div className="main-area-container"> 
                <div className="sponsor-info-container"> 
                  <div className="sponsor-info-text-img-container"> 
                    <img className="sponsor-info-img" src={img_1}> 
                    </img> 
                    <div className="sponsor-info-text"> 
                      <h1>Big Hill Sponsor</h1>
                      <p>Provide Supplies For Virtual Camp</p>
                    </div>
                  </div>
                  <PaddlePledgeIndicator
                      pledgeAmounts={sessionData.pledgeAmountSelections}
                      currentPledgeAmount={sessionData.currentPledgeAmount}
                    />
                </div>
                <PaddleActivityContainer
                  sessionPaddles={sessionPaddles}
                  user={user}
                />
                <PaddlePledgeContainer
                  firebase={firebase}
                  sessionId={sessionId}
                  user={user}
                  currentPledgeAmount={sessionData.currentPledgeAmount}
                />
              </div> 
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

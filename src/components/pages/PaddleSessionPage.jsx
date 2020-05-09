import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';

import PaddleActivityContainer from '../containers/PaddleActivityContainer';
import PaddlePledgeContainer from '../containers/PaddlePledgeContainer';
import PaddlePledgeIndicator from '../containers/PaddlePledgeIndicator';
import DonationProgressBar from '../containers/DonationProgressBar';
import FooterContainer from '../containers/FooterContainer';

import './styles/PaddleSessionPageStyles.css';

// TODO Taylor: choose which images to display for what value
import backgroundImage2500 from '../../images/kesem-2.jpg';
import backgroundImage1000 from '../../images/kesem-3.jpg';
import backgroundImage500 from '../../images/kesem-4.jpg';
import backgroundImage250 from '../../images/kesem-5.jpg';
import backgroundImage100 from '../../images/kesem-6.jpg';
import backgroundImage50 from '../../images/kesem-7.jpg';
import backgroundImage20 from '../../images/kesem-9.jpg';

// TODO Taylor: change sponsor title and descriptions for each value
const SPONSOR_TITLE_2500 = 'Big Hill Sponsor';
const SPONSOR_DESCRIPTION_2500 = 'Provide Supplies For Virtual Camp';
const SPONSOR_TITLE_1000 = 'sponsor title';
const SPONSOR_DESCRIPTION_1000 = 'sponsor description';
const SPONSOR_TITLE_500 = 'sponsor title';
const SPONSOR_DESCRIPTION_500 = 'sponsor description';
const SPONSOR_TITLE_250 = 'sponsor title';
const SPONSOR_DESCRIPTION_250 = 'sponsor description';
const SPONSOR_TITLE_100 = 'sponsor title';
const SPONSOR_DESCRIPTION_100 = 'sponsor description';
const SPONSOR_TITLE_50 = 'sponsor title';
const SPONSOR_DESCRIPTION_50 = 'sponsor description';
const SPONSOR_TITLE_20 = 'sponsor title';
const SPONSOR_DESCRIPTION_20 = 'sponsor description';

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
  const [numberOfPaddlesInSession, setNumberOfPaddlesInSession] = useState(0);
  const [sponsorTitle, setSponsorTitle] = useState('');
  const [sponsorDescription, setSponsorDescription] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(backgroundImage2500);

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
        setSessionPaddles(
          querySnapshot.docs.map((doc) => {
            const docData = doc.data();

            // Use spread operator below so we can include the doc ID
            return {
              id: doc.id,
              ...docData,
            };
          }),
        );
      },
    );
  };

  const subscribeToNumberPaddlesInSession = () => {
    firebase.subscribeToNumberOfPaddlesInSession(
      sessionId,
      (querySnapshot) => {
        console.log('got the number of paddles in session: ', querySnapshot.docs.length)
        setNumberOfPaddlesInSession(querySnapshot.docs.length);
      }
    );
  }

  /**
   * On update current pledge amount.
   * Change the image and the sponsor text.
   */
  useEffect(() => {
    switch (sessionData.currentPledgeAmount) {
      case 2500: {
        setSponsorTitle(SPONSOR_TITLE_2500);
        setSponsorDescription(SPONSOR_DESCRIPTION_2500);
        setBackgroundImage(backgroundImage2500);
        break;
      }
      case 1000: {
        setSponsorTitle(SPONSOR_TITLE_1000);
        setSponsorDescription(SPONSOR_DESCRIPTION_1000);
        setBackgroundImage(backgroundImage1000);
        break;
      }
      case 500: {
        setSponsorTitle(SPONSOR_TITLE_500);
        setSponsorDescription(SPONSOR_DESCRIPTION_500);
        setBackgroundImage(backgroundImage500);
        break;
      }
      case 250: {
        setSponsorTitle(SPONSOR_TITLE_250);
        setSponsorDescription(SPONSOR_DESCRIPTION_250);
        setBackgroundImage(backgroundImage250);
        break;
      }
      case 100: {
        setSponsorTitle(SPONSOR_TITLE_100);
        setSponsorDescription(SPONSOR_DESCRIPTION_100);
        setBackgroundImage(backgroundImage100);
        break;
      }
      case 50: {
        setSponsorTitle(SPONSOR_TITLE_50);
        setSponsorDescription(SPONSOR_DESCRIPTION_50);
        setBackgroundImage(backgroundImage50);
        break;
      }
      case 20: {
        setSponsorTitle(SPONSOR_TITLE_20);
        setSponsorDescription(SPONSOR_DESCRIPTION_20);
        setBackgroundImage(backgroundImage20);
        break;
      }
      default: {
        break;
      }
    }
  }, [sessionData.currentPledgeAmount]);

  /**
   * on session validated
   */
  useEffect(() => {
    if (sessionIsValid) {
      subscribeToPaddles();
      subscribeToNumberPaddlesInSession();
    }
  }, [sessionIsValid]);

  /**
   * On update to user screen name
   */
  useEffect(() => {
    if (user.screenName === '' || user.email === '' || sessionId === '') {
      return;
    }

    firebase.addJoinSessionNotification(user.screenName, user.email, sessionId);
  }, [user.screenName, user.email, sessionId]);

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

    // Get screen name if we don't have screen name already
    if (routerState.screenName === '') {
      console.log('generating screen name');
      firebase.getUniqueJoineeId(urlVars.sessionId)
        .then((uniquePaddleId) => {
          setUser((prevUserState) => ({
            name: prevUserState.name,
            email: prevUserState.email,
            screenName: `Paddle #${uniquePaddleId}`,
          }));
        });
    }
  }, []);


  return (
    <div>
      {
        sessionIsValid
          ? (
            <FadeIn delay = '500' transitionDuration = '2000'>
              <DonationProgressBar
                currentDonationTotal={sessionData.donationTotal}
                donationGoal={sessionData.donationGoal}
              />
              <div className="main-area-container"> 
                <div className="sponsor-info-container"> 
                  <div className="sponsor-info-img-text-container">
                    <img className="sponsor-info-img" src={backgroundImage}> 
                    </img> 

                    <div className="sponsor-info-text"> 
                      <h1>{sponsorTitle}</h1>
                      <p>{sponsorDescription}</p>
                    </div>
                  </div>
                 
                  <PaddlePledgeIndicator
                    pledgeAmounts={sessionData.pledgeAmountSelections}
                    currentPledgeAmount={sessionData.currentPledgeAmount}
                  />
                </div>
                <PaddleActivityContainer
                  sessionPaddles={sessionPaddles}
                  sessionId={sessionId}
                />
                <PaddlePledgeContainer
                  firebase={firebase}
                  sessionId={sessionId}
                  user={user}
                  currentPledgeAmount={sessionData.currentPledgeAmount}
                  numberOfPaddlesInSession={numberOfPaddlesInSession}
                />
              </div> 
              <FooterContainer> 
                </FooterContainer>
            </FadeIn>
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

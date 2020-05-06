import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';

import './styles/LandingPageStyles.css';
import CountdownContainer from '../containers/CountdownContainer';

function LandingPage({ firebase }) {
  const [facebookLiveLink, setFacebookLiveLink] = useState('');

  useEffect(() => {
    firebase.getFacebookLiveLink()
      .then((link) => {
        setFacebookLiveLink(link);
      });
  }, []);

  const buttonFunction = () => {
    window.open(facebookLiveLink);
  };

  return (
    <FadeIn delay="750" transitionDuration="2500">
      <div id="welcome-banner">
        welcome to
        {' '}
        <br />
        make the magic
      </div>
      <div id="welcome-message">
        Proudly presented by Camp Kesem at UCLA on
        <br />
        <b>Saturday, May 9th, 6-7pm PST</b>

      </div>
      <div id="bottom-container">
        <div id="link-to-stream">
          <div id="link-to-stream-text">
            livestream on
          </div>
          <button id="link-to-stream-button" type="button" onClick={buttonFunction}>
            Facebook Live
          </button>
        </div>
        <div id="countdown-wrapping">
          <CountdownContainer />
        </div>
      </div>
    </FadeIn>
  );
}

LandingPage.propTypes = {
  firebase: PropTypes.shape({
    getFacebookLiveLink: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingPage;

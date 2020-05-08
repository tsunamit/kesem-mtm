import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import OutlineTextBox from '../input/OutlineTextBox';
import RoundedButton from '../input/RoundedButton';

import './styles/CardContainerStyles.css';
import './styles/FormContainerStyles.css';

import * as ROUTES from '../../constants/routes';

// TODO: move these strings to separate file
const JOIN_PADDLE_RAISE_TITLE = 'Join This Saturday!';
const JOIN_DESCRIPTION = 'Join our Paddle Raise during our livestream on Saturday, May 9th, from 6-7pm PST on Facebook Live!';
const JOIN_NAME_PLACEHOLDER = 'Full Name';
const JOIN_EMAIL_PLACEHOLDER = 'Email Address';
const JOIN_SCREEN_NAME_PLACEHOLDER = 'Screen Name (Optional)';
const SCREEN_NAME_DESCRIPTION = 'Your screen name will be visible to the lobby when you raise your paddle. If left blank, we will assign you a paddle number.';
const JOIN_SESSION_ID_PLACEHOLDER = 'Session ID';
const SESSION_ID_DESCRIPTION = 'The Session ID will be provided during the livestream. If you missed the ID, please comment in the livestream chat. '
const ENTER_PADDLE_RAISE_BTN_TEXT = 'Enter Paddle Raise';

const INVALID_NAME = '* Please enter a name.';
const INVALID_EMAIL = '* Please enter a valid email.';
const INVALID_SESSION_ID = '* Session does not exist.';

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailIsValid = (email) => (
  regexEmail.test(email)
);

function JoinPaddleRaiseContainer({ firebase }) {
  const routerHistory = useHistory();

  const [paddleRaiseName, setPaddleRaiseName] = useState('');
  const [paddleRaiseEmail, setPaddleRaiseEmail] = useState('');
  const [paddleRaiseScreenName, setPaddleRaiseScreenName] = useState('');
  const [paddleRaiseSessionId, setPaddleRaiseSessionId] = useState('');

  const [paddleRaiseEmailIsValid, setPaddleRaiseEmailIsValid] = useState(true);
  const [paddleRaiseSessionIdIsValid, setPaddleRaiseSessionIdIsValid] = useState(true);
  const [paddleRaiseNameIsValid, setPaddleRaiseNameIsValid] = useState(true);

  const formIsValid = async () => {
    let isValid = true;

    if (paddleRaiseName === '') {
      setPaddleRaiseNameIsValid(false);
      isValid = false;
    } else {
      setPaddleRaiseNameIsValid(true);
    }

    if (paddleRaiseEmail === '' || !emailIsValid(paddleRaiseEmail)) {
      // TODO update styles to indicate false email
      setPaddleRaiseEmailIsValid(false);
      isValid = false;
    } else {
      setPaddleRaiseEmailIsValid(true);
    }

    const sessionExists = paddleRaiseSessionId === ''
      ? false
      : await firebase.sessionExists(paddleRaiseSessionId);

    if (!sessionExists) {
      setPaddleRaiseSessionIdIsValid(false);
      isValid = false;
    } else {
      setPaddleRaiseSessionIdIsValid(true);
    }

    return isValid;
  };

  const onClickJoin = async () => {
    const isValid = await formIsValid();

    if (isValid) {
      routerHistory.push({
        pathname: ROUTES.PADDLE_SESSION,
        search: `?sessionId=${paddleRaiseSessionId}`,
        state: {
          name: paddleRaiseName,
          email: paddleRaiseEmail,
          screenName: paddleRaiseScreenName,
        },
      });
    }
  };

  return (
    <div id="card-container">
      <div id="card-container-h1">{JOIN_PADDLE_RAISE_TITLE}</div>
      <div id="card-container-p">{JOIN_DESCRIPTION}</div>
      <OutlineTextBox
        value={paddleRaiseName}
        placeholder={JOIN_NAME_PLACEHOLDER}
        onChangeText={(text) => setPaddleRaiseName(text)}
      />
      {
        paddleRaiseNameIsValid
          ? null
          : (
            <p className="invalid-form-entry-p">{INVALID_NAME}</p>
          )
      }
      <OutlineTextBox
        value={paddleRaiseEmail}
        placeholder={JOIN_EMAIL_PLACEHOLDER}
        onChangeText={(text) => setPaddleRaiseEmail(text)}
      />
      {
        paddleRaiseEmailIsValid
          ? null
          : (
            <p className="invalid-form-entry-p">{INVALID_EMAIL}</p>
          )
      }
      <OutlineTextBox
        value={paddleRaiseScreenName}
        placeholder={JOIN_SCREEN_NAME_PLACEHOLDER}
        onChangeText={(text) => setPaddleRaiseScreenName(text)}
      />
      <div id="card-container-fine-text-first">{SCREEN_NAME_DESCRIPTION}</div>
      <OutlineTextBox
        value={paddleRaiseSessionId}
        placeholder={JOIN_SESSION_ID_PLACEHOLDER}
        onChangeText={(text) => setPaddleRaiseSessionId(text)}
      />
      {
        paddleRaiseSessionIdIsValid
          ? null
          : (
            <p className="invalid-form-entry-p">{INVALID_SESSION_ID}</p>
          )
      }
      <div id="card-container-fine-text"> {SESSION_ID_DESCRIPTION}</div> 
      <RoundedButton title={ENTER_PADDLE_RAISE_BTN_TEXT} onClick={async () => onClickJoin()} />
    </div>
  );
}

JoinPaddleRaiseContainer.propTypes = {
  firebase: PropTypes.shape({
    sessionExists: PropTypes.func.isRequired,
  }).isRequired,
};

export default JoinPaddleRaiseContainer;

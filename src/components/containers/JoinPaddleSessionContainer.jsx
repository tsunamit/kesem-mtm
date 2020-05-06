import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import OutlineTextBox from '../input/OutlineTextBox';
import RoundedButton from '../input/RoundedButton';
import './styles/CardContainerStyles.css';

import * as ROUTES from '../../constants/routes';
import FadeIn from 'react-fade-in';

// TODO: move these strings to separate file
const JOIN_PADDLE_RAISE_TITLE = 'Join This Saturday!';
const JOIN_DESCRIPTION = 'Join our Paddle Raise during our livestream on Saturday, May 9th, from 6-7pm PST on Facebook Live!';
const JOIN_NAME_PLACEHOLDER = 'Full Name';
const JOIN_EMAIL_PLACEHOLDER = 'Email Address';
const JOIN_SCREEN_NAME_PLACEHOLDER = 'Screen Name (Optional)';
const SCREEN_NAME_DESCRIPTION = 'Your screen name will be visible to the lobby when you raise your paddle. If left blank, we will assign you a paddle number.';
const JOIN_SESSION_ID_PLACEHOLDER = 'Session Password';
const ENTER_PADDLE_RAISE_BTN_TEXT = 'Enter Paddle Raise';

function CardContainer({ children }) {
  const routerHistory = useHistory();

  const [paddleRaiseName, setPaddleRaiseName] = useState('');
  const [paddleRaiseEmail, setPaddleRaiseEmail] = useState('');
  const [paddleRaiseScreenName, setPaddleRaiseScreenName] = useState('');
  const [paddleRaiseSessionId, setPaddleRaiseSessionId] = useState('');

  const onClickJoin = () => {
    console.log('TODO check form');
    routerHistory.push({
      // pathname: ROUTES.PADDLE_SESSION,
      pathname: ROUTES.PADDLE_SESSION,
      search: `?sessionId=${paddleRaiseSessionId}`,
      state: {
        name: paddleRaiseName,
        email: paddleRaiseEmail,
        screenName: paddleRaiseScreenName,
      },
    });
  };

  return (
    <div id="card-container">
       <div id = 'card-container-h1'>{JOIN_PADDLE_RAISE_TITLE}</div>
        <div id = 'card-container-p'>{JOIN_DESCRIPTION}</div>
        {/* <OutlineTextBox
          value={paddleRaiseName}
          placeholder={JOIN_NAME_PLACEHOLDER}
          onChangeText={(text) => setPaddleRaiseName(text)}
        />
        <OutlineTextBox
          value={paddleRaiseEmail}
          placeholder={JOIN_EMAIL_PLACEHOLDER}
          onChangeText={(text) => setPaddleRaiseEmail(text)}
        />
        <OutlineTextBox
          value={paddleRaiseScreenName}
          placeholder={JOIN_SCREEN_NAME_PLACEHOLDER}
          onChangeText={(text) => setPaddleRaiseScreenName(text)}
        />
        <OutlineTextBox
          value={paddleRaiseSessionId}
          placeholder={JOIN_SESSION_ID_PLACEHOLDER}
          onChangeText={(text) => setPaddleRaiseSessionId(text)}
        />
        <div id ='card-container-fine-text'>{SCREEN_NAME_DESCRIPTION}</div>
        <RoundedButton title={ENTER_PADDLE_RAISE_BTN_TEXT} onClick={() => onClickJoin()} /> */}
    </div>
  );
}

export default CardContainer;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import CardContainer from '../containers/CardContainer';
import OutlineTextBox from '../input/OutlineTextBox';
import RoundedButton from '../input/RoundedButton';

import * as ROUTES from '../../constants/routes';

// TODO: move these strings to separate file
const JOIN_PADDLE_RAISE_TITLE = 'Join our paddle raise!';
const JOIN_DESCRIPTION = 'After this event we will contact your email and direct you to Classy, our official fundraising platform';
const JOIN_NAME_PLACEHOLDER = 'Full Name';
const JOIN_EMAIL_PLACEHOLDER = 'Email Address';
const JOIN_SCREEN_NAME_PLACEHOLDER = 'Screen Name (Optional)';
const SCREEN_NAME_DESCRIPTION = 'Your screen name will be visible to the lobby when you raise your paddle. If left blank, we will assign you a paddle number.';
const JOIN_SESSION_ID_PLACEHOLDER = 'Session ID';
const ENTER_PADDLE_RAISE_BTN_TEXT = 'Enter Paddle Raise';

function PaddleHomePage() {
  const routerHistory = useHistory();

  const [paddleRaiseName, setPaddleRaiseName] = useState('');
  const [paddleRaiseEmail, setPaddleRaiseEmail] = useState('');
  const [paddleRaiseScreenName, setPaddleRaiseScreenName] = useState('');
  const [paddleRaiseSessionId, setPaddleRaiseSessionId] = useState('');

  const onClickJoin = () => {
    console.log('TODO check form');
    routerHistory.push({
      pathname: ROUTES.PADDLE_SESSION,
      state: {
        name: paddleRaiseName,
        email: paddleRaiseEmail,
        screenName: paddleRaiseScreenName,
        // TODO remove session id as a param and move it to the URL
        sessionId: paddleRaiseSessionId,
      },
    });
  };

  return (
    <div>
      <div>
        <h1>picture here!</h1>
      </div>
      <div>
        <h1>join here</h1>
        {/* Join paddle raise card */}
        <CardContainer>
          <h1>{JOIN_PADDLE_RAISE_TITLE}</h1>
          <p>{JOIN_DESCRIPTION}</p>
          <OutlineTextBox
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
          <p>{SCREEN_NAME_DESCRIPTION}</p>
          <RoundedButton title={ENTER_PADDLE_RAISE_BTN_TEXT} onClick={() => onClickJoin()} />
        </CardContainer>
      </div>
    </div>
  );
}

export default PaddleHomePage;

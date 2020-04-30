import React, { useState } from 'react';

import CardContainer from '../containers/CardContainer';
import OutlineTextBox from '../input/OutlineTextBox';

// TODO: move these strings to separate file
const JOIN_PADDLE_RAISE_TITLE = 'Join our paddle raise!';
const JOIN_DESCRIPTION = 'After this event we will contact your email and direct you to Classy, our official fundraising platform';
const JOIN_NAME_PLACEHOLDER = 'Full Name';
const JOIN_EMAIL_PLACEHOLDER = 'Email Address';
const JOIN_SCREEN_NAME_PLACEHOLDER = 'Screen Name (Optional)';

function JoinPaddlePage() {
  const [paddleRaiseName, setPaddleRaiseName] = useState('');
  const [paddleRaiseEmail, setPaddleRaiseEmail] = useState('');
  const [paddleRaiseScreenName, setPaddleRaiseScreenName] = useState('');

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
        </CardContainer>
      </div>
    </div>
  );
}

export default JoinPaddlePage;

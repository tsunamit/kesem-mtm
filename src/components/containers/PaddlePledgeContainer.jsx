import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import CardContainer from './CardContainer';
import RoundedButton from '../input/RoundedButton';

function PaddlePledgeContainer({ firebase, user, currentPledgeAmount, sessionId }) {
  const onClickRaisePaddle = () => {
    firebase.addPaddle(user.name, user.email, currentPledgeAmount, sessionId);
  };

  return (
    <CardContainer>
      <p>You are {user.name}</p>
      <h2>Pledge to give</h2>
      <h1>${currentPledgeAmount}</h1>
      <RoundedButton title="Raise my paddle!" onClick={() => onClickRaisePaddle()} />
    </CardContainer>
  );
}

PaddlePledgeContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
  currentPledgeAmount: PropTypes.number.isRequired,
};

export default PaddlePledgeContainer;
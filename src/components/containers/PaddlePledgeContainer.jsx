import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import './styles/PaddlePledgeContainerStyles.css';

import RoundedButton from '../input/RoundedButton';

function PaddlePledgeContainer({
  firebase, user, currentPledgeAmount, sessionId,
}) {
  const onClickRaisePaddle = () => {
    firebase.addPaddle(user.name, user.screenName, user.email, currentPledgeAmount, sessionId);
  };

  return (
    <div className="paddle-pledge-container">
      <div className="paddle-pledge-container-p">
        Screen Name:
        <br />
        {' '}<b>{' '}{user.screenName}{' '}</b>
      </div>
      <div className="paddle-pledge-container-h2">Pledge to give</div>
      <div className="paddle-pledge-container-h1">
        $
        {currentPledgeAmount}
      </div>
      <div className="paddle-pledge-button-wrapper">
        <RoundedButton title="Raise my paddle!" onClick={() => onClickRaisePaddle()} />
      </div>
    </div>
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

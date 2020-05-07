import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import PropTypes from 'prop-types';
import './styles/PaddlePledgeContainerStyles.css';

import RoundedButton from '../input/RoundedButton';

function PaddlePledgeContainer({ firebase, user, currentPledgeAmount, sessionId }) {

  const firebaseAddPaddle = () => {
    firebase.addPaddle(user.name, user.screenName, user.email, currentPledgeAmount, sessionId);
  }

  const onClickRaisePaddle = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirmation-custom-ui'>
            <h1>Raise Paddle for ${currentPledgeAmount}?</h1>
            <button className = "confirmation-custom-ui-no-button" 
              onClick={onClose}>
              No
            </button>
            <button className = "confirmation-custom-ui-yes-button"
              onClick={() => {
                firebaseAddPaddle();
                onClose();
                onClickConfirmRaisePaddle();
              }}
            >
              Yes, raise it!
            </button>
          </div>
        );
        
      }, 
    });
  };

  const onClickConfirmRaisePaddle = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirmation-custom-ui'>
            <button className = "confirmation-custom-ui-close-button"  onClick={onClose}>
              x
            </button>
            <h1>Paddle Raised! </h1>
            <h2> Thank you for supporting Camp Kesem! </h2>
            <p> At the conclusion of this event, we will contact  
              <br></br>
              <br></br>
              <b>{user.email}</b>
              <br></br> 
              <br></br>
              to confirm the details of your donation and direct you to our donation page! 
              <br></br>
              <br></br>
              If you would like to be contacted at a different email, please email us at ucla.mtm@campkesem.org. </p>
            

          </div>
        );
      }
    });
  }

  return ( 
    <div className='paddle-pledge-container'>
      <div className='paddle-pledge-container-p'>Screen Name: <br></br> <b> {user.screenName} </b></div>
      <div className='paddle-pledge-container-h2'>Pledge to give</div>
      <div className='paddle-pledge-container-h1'>${currentPledgeAmount}</div>
      <div className= "paddle-pledge-button-wrapper"> 
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

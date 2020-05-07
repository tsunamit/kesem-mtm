import React, { useState } from 'react';
import FadeIn from 'react-fade-in';

import FirebaseContext from '../firebase/context';

import './styles/PaddleHomePageStyles.css';

import FooterContainer from '../containers/FooterContainer';
import CardContainer from '../containers/CardContainer';
import img_1 from '../../images/kesem-mtm-1.jpg'
import JoinPaddleRaiseContainer from '../containers/JoinPaddleRaiseContainer';

function PaddleHomePage() {
  return (
    <FadeIn delay = '500' transitionDuration = '2000'>
      <div id = 'horizontal-container'>
        <img id = 'picture-container' src={img_1}></img>
        <FirebaseContext.Consumer>
          {(firebase) => (
            <JoinPaddleRaiseContainer firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
      </div>
      <FooterContainer></FooterContainer> 
    </FadeIn>
  );
}

export default PaddleHomePage;

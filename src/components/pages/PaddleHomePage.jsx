import React, { useState } from 'react';
import FadeIn from 'react-fade-in';

import './styles/PaddleHomePageStyles.css';

import CardContainer from '../containers/CardContainer';
import img_1 from '../../images/kesem-mtm-1.jpg'

function PaddleHomePage() {
  return (
    <FadeIn delay = '500' transitionDuration = '2000'>
      <div id = 'horizontal-container'>
        <img id = 'picture-container' src={img_1}></img>
        <CardContainer></CardContainer>
      </div>
    </FadeIn>
    
  );
}

export default PaddleHomePage;

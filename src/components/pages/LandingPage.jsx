import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import './styles/LandingPageStyles.css';
import CountdownContainer from '../containers/CountdownContainer'

const FB_LIVE_URL = "https://www.facebook.com/events/244214730277995?acontext=%7B%22source%22%3A5%2C%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22main_list%22%2C%22extra_data%22%3A%22%5C%22[]%5C%22%22%7D]%2C%22has_source%22%3Atrue%7D"

function LandingPage() {
  
  const buttonFunction = () => {
    window.open(FB_LIVE_URL)
  }
  
  return (
    <FadeIn delay = '750' transitionDuration = '2500' >
        <div id = 'welcome-banner'> 
        welcome to <br></br>make the magic
        </div>
        <div id = 'welcome-message'>
        Proudly presented by Camp Kesem at UCLA on<br></br>
        <b>Saturday, May 9th, 6-7pm PST</b>
        
        </div>
        <div id = 'bottom-container'>
          <div id = 'link-to-stream'>
            <div id = 'link-to-stream-text'>
            livestream on
            </div>
            <button id = 'link-to-stream-button' type="button" onClick={buttonFunction} >
            Facebook Live
            </button>
          </div>
          <div id = 'countdown-wrapping'> 
            <CountdownContainer/>
          </div> 
        </div>
    </FadeIn>
  );
};

export default LandingPage;
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navigationStyles.css';
import logo from '../../images/ck-logo.png';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div id = 'navigation-container'>
        
        
        <Link id = 'navigation-button' to={ROUTES.LANDING}><img id = 'ck-logo' src={logo} alt="CK Logo"/></Link>
        <div id= 'navigation-gap'></div> 
        <Link id = 'navigation-button' to={ROUTES.LANDING}>Welcome</Link>
        <Link id = 'navigation-button' to={ROUTES.AUCTION}>About</Link>
        <Link id = 'navigation-button' to={ROUTES.PADDLE_HOME}>Paddle Raise</Link>
        <Link id = 'navigation-button' to={ROUTES.AUCTION}>Auction</Link>
        {/* TO DO: Change this link to be the ABOUT page */}

  </div>
);

export default Navigation;
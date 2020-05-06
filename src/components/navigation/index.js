/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../images/ck-logo.png';
import * as ROUTES from '../../constants/routes';

import './styles/navigationStyles.css';

const navigationButtonUnselectedStyle = 'navigation-button';
const navigationButtonSelectedStyle = 'navigation-button navigation-button-selected';

const getButtonStyle = (currentRoute, navigationButtonRoute) => (
  currentRoute === navigationButtonRoute
    ? navigationButtonSelectedStyle
    : navigationButtonUnselectedStyle
);

function Navigation() {
  const browserLocation = useLocation();
  const currentRoute = browserLocation.pathname;

  return (
    <div id="navigation-container">
      <Link id="navigation-button" to={ROUTES.LANDING}>
        <img id="ck-logo" src={logo} alt="CK Logo" />
      </Link>
      <div id="navigation-gap" />
      <Link className={getButtonStyle(currentRoute, ROUTES.LANDING)} to={ROUTES.LANDING}>
        Welcome
      </Link>
      <Link className={getButtonStyle(currentRoute, ROUTES.ABOUT)} to={ROUTES.ABOUT}>
        About
      </Link>
      <Link className={getButtonStyle(currentRoute, ROUTES.PADDLE_HOME)} to={ROUTES.PADDLE_HOME}>
        Paddle Raise
      </Link>
      <Link className={getButtonStyle(currentRoute, ROUTES.AUCTION)} to={ROUTES.AUCTION}>
        Auction
      </Link>
    </div>
  );
}

export default Navigation;

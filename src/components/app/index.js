/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../pages/LandingPage';
import PaddleHomePage from '../pages/PaddleHomePage';
import PaddleSessionPage from '../pages/PaddleSessionPage';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.PADDLE_HOME} component={PaddleHomePage} />
      <Route path={ROUTES.PADDLE_SESSION} component={PaddleSessionPage} />
    </div>
  </Router>
);

export default App;
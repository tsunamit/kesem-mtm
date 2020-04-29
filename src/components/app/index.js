import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../pages/LandingPage';
import PaddlePage from '../pages/PaddlePage';
import JoinPaddlePage from '../pages/JoinPaddlePage';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.JOIN_PADDLE} component={JoinPaddlePage} />
    </div>
  </Router>
);

export default App;
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../pages/landing/landing';
import PaddlePage from '../pages/paddle/paddle';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.PADDLE} component={PaddlePage} />
    </div>
  </Router>
);

export default App;
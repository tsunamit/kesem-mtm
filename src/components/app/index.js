/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FirebaseContext from '../firebase/context';

import Navigation from '../navigation';
import LandingPage from '../pages/LandingPage';
import PaddleHomePage from '../pages/PaddleHomePage';
import PaddleSessionPage from '../pages/PaddleSessionPage';
import AuctionPage from '../pages/AuctionPage';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />


      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.PADDLE_HOME} component={PaddleHomePage} />
      <Route
        path={ROUTES.AUCTION}
        render={(props) => (
          <FirebaseContext.Consumer>
            {(firebase) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <AuctionPage {...props} firebase={firebase} />
            )}
          </FirebaseContext.Consumer>
        )}
      />
      <Route
        path={ROUTES.PADDLE_SESSION}
        render={(props) => (
          <FirebaseContext.Consumer>
            {(firebase) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <PaddleSessionPage {...props} firebase={firebase} />
            )}
          </FirebaseContext.Consumer>
        )}
      />
    </div>
  </Router>
);

export default App;
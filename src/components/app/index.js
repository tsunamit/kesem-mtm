/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FirebaseContext from '../firebase/context';

import Navigation from '../navigation';
import LandingPage from '../pages/LandingPage';
import PaddleHomePage from '../pages/PaddleHomePage';
import PaddleSessionPage from '../pages/PaddleSessionPage';
import AuctionPage from '../pages/AuctionPage';
import AboutPage from '../pages/AboutPage';
import AdminPage from '../pages/AdminPage';

import * as ROUTES from '../../constants/routes';

import '../../styles/defaultStyles.css';

const App = () => (
  <Router>
    <div className="root-container">
      <Navigation />
      <Route path={ROUTES.PADDLE_HOME} component={PaddleHomePage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <FirebaseContext.Consumer>
        {(firebase) => (
          <>
            <Route
              exact
              path={ROUTES.LANDING}
              render={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <LandingPage {...props} firebase={firebase} />
              )}
            />
            <Route
              path={ROUTES.AUCTION}
              render={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <AuctionPage {...props} firebase={firebase} />
              )}
            />
            <Route
              path={ROUTES.PADDLE_SESSION}
              render={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <PaddleSessionPage {...props} firebase={firebase} />
              )}
            />
            <Route
              path={ROUTES.ADMIN}
              render={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <AdminPage {...props} firebase={firebase} />
              )}
            />
          </>
        )}
      </FirebaseContext.Consumer>
    </div>
  </Router>
);

export default App;
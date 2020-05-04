import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.PADDLE_HOME}>Paddle Raise</Link>
      </li>
      <li>
        <Link to={ROUTES.AUCTION}>Auction</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
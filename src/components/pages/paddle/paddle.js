import React, { useState, useEffect } from 'react';

import FirebaseContext from '../../firebase/context';
import PaddleActivityContainer from '../../containers/PaddleActivityContainer';

function PaddlePage() {

  return (
    <div>
      <h1>Paddle Page</h1>
      <FirebaseContext.Consumer>
        {(firebase) => <PaddleActivityContainer firebase={firebase} sessionId="test" />}
      </FirebaseContext.Consumer>
    </div>
  )
}

export default PaddlePage;
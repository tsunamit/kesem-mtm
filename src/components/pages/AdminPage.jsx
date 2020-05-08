import React, { useState, useEffect } from 'react';

import OutlineTextBox from '../input/OutlineTextBox';
import RoundedButton from '../input/RoundedButton';

function AdminPage({ firebase }) {
  const [newSessionId, setNewSessionId] = useState('');

  const createNewSession = () => {
    firebase.createNewPaddleSession(newSessionId);
  };

  return (
    <div>
      <h1>Admin Page</h1>

      {/* Create a new session */}
      <div>
        <h2>Create a new session</h2>
        <OutlineTextBox
          placeholder="New session ID"
          value={newSessionId}
          onChangeText={(text) => setNewSessionId(text)}
        />
        <br />
        <RoundedButton
          title="Create new session"
          onClick={() => createNewSession()}
        />
      </div>

      {/* Manage a session */}
      {/* Change the paddle raise value */}
    </div>
  );
}

export default AdminPage;

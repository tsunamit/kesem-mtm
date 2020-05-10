import React, { useState, useEffect } from 'react';

import OutlineTextBox from '../input/OutlineTextBox';
import RoundedButton from '../input/RoundedButton';

import { logPaddlesInSession } from '../../admin/adminFunctions';

function AdminPage({ firebase }) {
  const [newSessionId, setNewSessionId] = useState('');
  const [exportSessionId, setExportSessionId] = useState('');

  const createNewSession = async () => {
    await firebase.createNewPaddleSession(newSessionId);
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
          onClick={async () => createNewSession()}
        />
      </div>

      {/* Export session data */}
      <div>
        <h2>Export session data</h2>
        <OutlineTextBox
          placeholder="Session ID"
          value={exportSessionId}
          onChangeText={(text) => setExportSessionId(text)}
        />
        <br />
        <RoundedButton
          title="Export"
          onClick={async () => logPaddlesInSession(firebase, exportSessionId)}
        />
      </div>

    </div>
  );
}

export default AdminPage;

import app from 'firebase/app';
import 'firebase/firestore';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.firestore = app.firestore();
  }

  // Firestore API
  paddlesCollection = (sessionId) => this.firestore.collection(`sessions/${sessionId}/paddles`);

  addPaddle = async (name, email, amountPledged, sessionId) => {
    let createdAt = firebase.firestore.FieldValue.serverTimestamp();

    this.paddlesCollection(sessionId).add({
      name,
      email,
      amountPledged,
      createdAt,
    });
  }

  subscribeToPaddles = async (sessionId, onUpdate) => {
    return this.paddlesCollection(sessionId).onSnapshot(querySnapshot => onUpdate(querySnapshot));
  }
}

export default Firebase;
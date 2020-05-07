import app from 'firebase/app';
import 'firebase/firestore';
import firebase from 'firebase';

import { sessionData as sessionDataModel, AUCTION } from '../../constants/model';

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
  /**
   * Get a reference to the session document
   */
  sessionDocReference = (sessionId) => (
    this.firestore.doc(`sessions/${sessionId}`)
  );

  /**
   * Gets a subscription to the session document (live snapshot)
   */
  subscribeToSession = (sessionId, onSessionUpdate) => {
    console.log('getting session:', sessionId);
    const sessionDocumentRef = this.firestore.doc(`sessions/${sessionId}`);
    return sessionDocumentRef.onSnapshot((sessionDocumentSnapshot) => {
      onSessionUpdate(sessionDocumentSnapshot);
    });
  }

  sessionExists = async (sessionId) => {
    return this.sessionDocReference(sessionId).get()
      .then((doc) => {
        return doc.exists;
      });
  }

  /**
   * Get a reference to the paddles collection for a particular session. Need
   * this unordered version to be able to add new paddles
   */
  paddlesCollection = (sessionId) => (
    this.firestore.collection(`sessions/${sessionId}/paddles`)
  );

  /**
   * Get paddles collection ordered list based on creation time
   */
  orderedPaddlesCollection = (sessionId) => (
    this.firestore.collection(`sessions/${sessionId}/paddles`).orderBy('createdAt')
  );

  /**
   * Add 
   */
  addPaddle = async (name, screenName, email, amountPledged, sessionId) => {
    // generate a timestamp
    let createdAt = firebase.firestore.FieldValue.serverTimestamp();

    // add paddle to the list of paddles raised
    this.paddlesCollection(sessionId).add({
      name,
      screenName,
      email,
      amountPledged,
      createdAt,
    });

    // increment the donation total
    const atomicIncrement = firebase.firestore.FieldValue.increment(amountPledged);
    this.sessionDocReference(sessionId).update({
      [sessionDataModel.donationTotal]: atomicIncrement
    });
  }

  /**
   * 
   */
  subscribeToPaddles = async (sessionId, onUpdate) => {
    return this.orderedPaddlesCollection(sessionId).onSnapshot(querySnapshot => onUpdate(querySnapshot));
  }

  /**
   * Gets auction items from the auction collection
   */
  getAuctionItems = async () => {
    return this.firestore.collection('auction').orderBy(AUCTION.auctionOrder).get()
      .then((auctionCollection) => {
        const auctionCollectionDocData = auctionCollection.docs.map((auctionItem) => (
          auctionItem.data()
        ));
        return auctionCollectionDocData;
      })
  };

  /**
   * Get facebook live link
   */
  getFacebookLiveLink = async () => {
    return this.firestore.collection('links').doc('facebookLive').get()
      .then((facebookLiveDoc) => {
        if (facebookLiveDoc.exists) {
          return facebookLiveDoc.data().url;
        } else {
          return null;
        }
      });
  }
}

export default Firebase;
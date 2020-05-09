import app from 'firebase/app';
import 'firebase/firestore';
import firebase from 'firebase';

import {
  sessionData as sessionDataModel,
  AUCTION,
  paddleDataModel,
} from '../../constants/model';

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
   * Get a reference to the joinees collection for a particular session
   */
  joineesCollection = (sessionId) => (
    this.firestore.collection(`sessions/${sessionId}/joinees`)
  )

  /**
   * Get paddles collection ordered list based on creation time
   */
  orderedPaddlesCollection = (sessionId) => (
    this.firestore.collection(`sessions/${sessionId}/paddles`).orderBy('createdAt')
  );

  subscribeToNumberOfPaddlesInSession = async (sessionId, onUpdate) => {
    return this.joineesCollection(sessionId).onSnapshot(querySnapshot => onUpdate(querySnapshot));
  }

  /**
   * Add 
   */
  addPaddle = async (name, screenName, email, amountPledged, sessionId) => {
    // generate a timestamp
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    // add paddle to the list of paddles raised
    this.paddlesCollection(sessionId).add({
      [paddleDataModel.name]: name,
      [paddleDataModel.screenName]: screenName,
      [paddleDataModel.email]: email,
      [paddleDataModel.amountPledged]: amountPledged,
      [paddleDataModel.hearts]: 0,
      [paddleDataModel.createdAt]: createdAt,
    });

    // increment the donation total
    const atomicIncrement = firebase.firestore.FieldValue.increment(amountPledged);
    this.sessionDocReference(sessionId).update({
      [sessionDataModel.donationTotal]: atomicIncrement
    });
  }

  likeUnlikePaddleRaise = async (paddleRaiseDocId, sessionId, incrementValue) => {
    const atomicIncrement = firebase.firestore.FieldValue.increment(incrementValue);
    return this.firestore.doc(`sessions/${sessionId}/paddles/${paddleRaiseDocId}`).update({
      hearts: atomicIncrement,
    });
  }

  /**
   * Send a like to a specific paddle raised
   */
  likePaddleRaise = async (paddleRaiseDocId, sessionId) => {
    this.likeUnlikePaddleRaise(paddleRaiseDocId, sessionId, 1)
  }

  /**
   * Send a like to a specific paddle raised
   */
  unlikePaddleRaise = async (paddleRaiseDocId, sessionId) => {
    this.likeUnlikePaddleRaise(paddleRaiseDocId, sessionId, -1)
  }


  /**
   * Add join notification to paddles collection
   */
  addJoinSessionNotification = async (screenName, email, sessionId) => {
    const joinedAt = firebase.firestore.FieldValue.serverTimestamp();

    // add paddle to the list of paddles raised
    this.joineesCollection(sessionId).add({
      [paddleDataModel.screenName]: screenName,
      [paddleDataModel.email]: email,
      [paddleDataModel.createdAt]: joinedAt,
    });
  }

  /**
   * Create a subscription to paddle feed
   */
  subscribeToPaddles = async (sessionId, onUpdate) => {
    return this.orderedPaddlesCollection(sessionId).onSnapshot(querySnapshot => onUpdate(querySnapshot));
  }

  /**
   * Atomically read the current paddle counter and assign this to ourself.
   * Then increment the counter so the next person who reads will have a
   * unique, higher number
   */
  getUniqueJoineeId = async (sessionId) => {
    const atomicIncrementPaddleId = firebase.firestore.FieldValue.increment(1);
    const sessionDocReference = this.sessionDocReference(sessionId);

    let uniquePaddleId;

    const atomicUniquePaddleTransaction = await this.firestore.runTransaction(async t => {
      const sessionDocResult = await t.get(sessionDocReference);

      uniquePaddleId = sessionDocResult.data()[sessionDataModel.paddleIdCounter];

      await t.update(sessionDocReference, {
        [sessionDataModel.paddleIdCounter]: atomicIncrementPaddleId,
      });
    });

    return uniquePaddleId;
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

  /**
   * Create a new session with all session document data initialized as well as a subcollection for paddles
   */
  createNewPaddleSession = async (sessionId) => {
    console.log('TODO create new session: ', sessionId);
    return this.firestore.doc(`sessions/${sessionId}`).set({
      [sessionDataModel.currentPledgeAmount]: 2500,
      [sessionDataModel.donationGoal]: 20000,
      [sessionDataModel.donationTotal]: 0,
      [sessionDataModel.pledgeAmountSelections]: [2500, 1000, 500, 250, 100, 50, 20],
      [sessionDataModel.paddleIdCounter]: 0,
    })
    .then(() => {
      console.log(`Created new session ${sessionId} successfully!`);
    });
  }
}

export default Firebase;
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FY_FIREBASE_API_KEY,
  authDomain: process.env.FY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FY_FIREBASE_DATABASE_URL,
  projectId: process.env.FY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.FY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FY_FIREBASE_APP_ID,
  measurementId: process.env.FY_FIREBASE_MEASUREMENT_ID,
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBlVKbwTwm9OSIoIB5I6rFQH6Gq8Q-ro_s',
  authDomain: 'feedyak-f32b2.firebaseapp.com',
  databaseURL: 'https://feedyak-f32b2.firebaseio.com',
  projectId: 'feedyak-f32b2',
  storageBucket: 'feedyak-f32b2.appspot.com',
  messagingSenderId: '625204701256',
  appId: '1:625204701256:web:484e47a6e31fb26b1a107d',
  measurementId: 'G-4SSZFVNXLJ',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();

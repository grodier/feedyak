import * as admin from 'firebase-admin';
require('dotenv').config();
const serviceAccount = require('../googleCreds.json');

!admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FY_FIREBASE_DATABASE_URL,
    })
  : admin.app();

export const auth = admin.auth();

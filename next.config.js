const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  env: {
    FY_FIREBASE_PROJECT_ID: process.env.FY_FIREBASE_PROJECT_ID,
    FY_FIREBASE_PRIVATE_KEY_ID: process.env.FY_FIREBASE_PRIVATE_KEY_ID,
    FY_FIREBASE_PRIVATE_KEY: process.env.FY_FIREBASE_PRIVATE_KEY,
    FY_FIREBASE_CLIENT_EMAIL: process.env.FY_FIREBASE_CLIENT_EMAIL,
    FY_FIREBASE_CLIENT_ID: process.env.FY_FIREBASE_CLIENT_ID,
    FY_FIREBASE_CLIENT_X509_CERT_URL:
      process.env.FY_FIREBASE_CLIENT_X509_CERT_URL,
    FY_FIREBASE_API_KEY: process.env.FY_FIREBASE_API_KEY,
    FY_FIREBASE_AUTH_DOMAIN: process.env.FY_FIREBASE_AUTH_DOMAIN,
    FY_FIREBASE_DATABASE_URL: process.env.FY_FIREBASE_DATABASE_URL,
    FY_FIREBASE_STORAGE_BUCKET: process.env.FY_FIREBASE_STORAGE_BUCKET,
    FY_FIREBASE_MESSAGING_SENDER_ID:
      process.env.FY_FIREBASE_MESSAGING_SENDER_ID,
    FY_FIREBASE_APP_ID: process.env.FY_FIREBASE_APP_ID,
    FY_FIREBASE_MEASUREMENT_ID: process.env.FY_FIREBASE_MEASUREMENT_ID,
  },
});
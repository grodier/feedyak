const fs = require('fs');
require('dotenv').config();

const creds = {
  type: 'service_account',
  project_id: process.env.FY_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FY_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FY_FIREBASE_PRIVATE_KEY,
  client_email: process.env.FY_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FY_FOREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FY_FIREBASE_CLIENT_X509_CERT_URL,
};

const data = JSON.stringify(creds);
fs.writeFileSync('googleCreds.json', data);

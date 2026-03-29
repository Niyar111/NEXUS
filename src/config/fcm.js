const admin = require('firebase-admin');

let initialized = false;

const initFirebase = () => {
  if (initialized) {
    return admin;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase credentials are not fully configured; push notifications disabled.');
    return admin;
  }

  // Handle escaped newlines coming from .env
  privateKey = privateKey.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });

  initialized = true;

  console.log('Firebase Admin initialized');

  return admin;
};

const getMessaging = () => {
  initFirebase();
  return admin.messaging();
};

module.exports = {
  initFirebase,
  getMessaging
};


/* eslint-disable import/no-extraneous-dependencies */
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDV7F5RquNgMNhcQ_URcfPGZhgGhyZ-Roo',
  authDomain: 'oneadventure-c0c45.firebaseapp.com',
  projectId: 'oneadventure-c0c45',
  storageBucket: 'oneadventure-c0c45.appspot.com',
  messagingSenderId: '821027623464',
  appId: '1:821027623464:web:46d3956de086789f391b1d',
  measurementId: 'G-8N1D89NHTG',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };

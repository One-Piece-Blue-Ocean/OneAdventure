const jest = require('@jest/globals');

const firebase = jest.genMockFromModule('firebase/firestore');
const firebaseAuth = jest.genMockFromModule('firebase/auth');

firebase.initializeApp = jest.fn();

firebase.doc = jest.fn();
firebase.getDoc = jest.fn();

firebaseAuth.getAuth = jest.fn();
firebaseAuth.signInWithEmailAndPassword = jest.fn();

module.exports.firebase = firebase;
module.exports.firebaseAuth = firebaseAuth;

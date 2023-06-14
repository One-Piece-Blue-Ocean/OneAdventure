const { jest } = require('@jest/globals');

// const firestore = jest.createMockFromModule('firebase/firestore');
// const auth = jest.createMockFromModule('firebase/auth');

const doc = jest.fn();
const getDoc = jest.fn();
const getAuth = jest.fn();
const signInWithEmailAndPassword = jest.fn();

module.exports = {
  doc, getDoc, getAuth, signInWithEmailAndPassword,
};

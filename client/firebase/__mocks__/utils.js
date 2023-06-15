const { jest } = require('@jest/globals');

// const firestore = jest.createMockFromModule('firebase/firestore');
// const auth = jest.createMockFromModule('firebase/auth');

const collection = jest.fn();
const doc = jest.fn();
const getDoc = jest.fn();
const getDocs = jest.fn();
const query = jest.fn();
const where = jest.fn();
const addDoc = jest.fn();
const updateDoc = jest.fn();
const getAuth = jest.fn();
const signInWithEmailAndPassword = jest.fn();

module.exports = {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  getAuth,
  signInWithEmailAndPassword,
};

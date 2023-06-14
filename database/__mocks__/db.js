const { jest } = require('@jest/globals');

const app = jest.fn();
const db = jest.fn();

module.exports = { app, db };

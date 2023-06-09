require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/index');

const app = express();

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

module.exports = app;

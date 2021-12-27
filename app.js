require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { isAuthenticatedMiddleware, jwtAuthenticationMiddleware, jwtLogin } = require('./auth/jwt-auth');

const aboutRouter = require('./routes/about');

const app = express();
app.use(jwtAuthenticationMiddleware);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/jwt-login', jwtLogin);

app.use('/about', isAuthenticatedMiddleware, aboutRouter);

module.exports = app;

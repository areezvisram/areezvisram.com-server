require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { isAuthenticatedMiddleware, jwtAuthenticationMiddleware, jwtLogin } = require('./auth/jwt-auth');
const cors = require('cors');
const { routes } = require('./constants/routes');

const aboutRouter = require('./routes/about');
const experienceRouter = require('./routes/experience');

const app = express();
app.use(jwtAuthenticationMiddleware);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/jwt-login', jwtLogin);

app.use(routes.ABOUT_ROUTE, isAuthenticatedMiddleware, aboutRouter);
// app.use(routes.ABOUT_ROUTE, aboutRouter);
app.use(routes.EXPERIENCE_ROUTE, isAuthenticatedMiddleware, experienceRouter);
// app.use(routes.EXPERIENCE_ROUTE, experienceRouter);

module.exports = app;

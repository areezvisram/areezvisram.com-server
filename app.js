require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { isAuthenticatedMiddleware, jwtAuthenticationMiddleware, jwtLogin } = require('./auth/jwt-auth');
const cors = require('cors');
const { routes } = require('./constants/routes');

// Routers
const aboutRouter = require('./routes/about');
const experienceRouter = require('./routes/experience');
const projectsRouter = require('./routes/projects');

const app = express();

// JWT middleware
app.use(jwtAuthenticationMiddleware);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.post('/jwt-login', jwtLogin);
// app.use(routes.ABOUT_ROUTE, isAuthenticatedMiddleware, aboutRouter);
app.use(routes.ABOUT_ROUTE, aboutRouter);
app.use(routes.EXPERIENCE_ROUTE, isAuthenticatedMiddleware, experienceRouter);
// app.use(routes.PROJECTS_ROUTE, isAuthenticatedMiddleware, projectsRouter);
app.use(routes.PROJECTS_ROUTE, projectsRouter);

module.exports = app;

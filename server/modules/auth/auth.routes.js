const router = require('express').Router();
const controllers = require('./auth.controllers');
// const middlewares = require('../../middlewares');

const ROUTES = {
  signup: '/signup',
  login: '/login',
  logout: '/logout',
  isLoggedIn: '/login',
};

function authRouter(app) {
  router
    .post(ROUTES.signup, controllers.signup)
    .post(ROUTES.login, controllers.login)
    .post(ROUTES.logout, controllers.logout)
    .get(ROUTES.isLoggedIn, controllers.getLoggedInUser);

  app.use('/api', router);
}

module.exports = authRouter;

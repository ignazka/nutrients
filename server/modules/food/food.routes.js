const controllers = require('./food.controllers');
const router = require('express').Router();
const ROUTES = require('./food.constants');

function foodRouter(app) {
  router
    .get(ROUTES.getFood, controllers.getFood)
    .post(ROUTES.createFood, controllers.createFood)
    .put(ROUTES.updateFood, controllers.updateFood)
    .delete(ROUTES.deleteFood, controllers.deleteFood);

  app.use('/api', router);
}

module.exports = foodRouter;

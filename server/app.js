const app = require('express')();
const { connectDB, middlewares, sessionConfig } = require('./config');
const { PORT } = process.env;
const authRouter = require('./modules/auth');
const foodRouter = require('./modules/food');
async function start() {
  try {
    await connectDB();
    middlewares(app);
    sessionConfig(app);
    authRouter(app);
    foodRouter(app);
    app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
  } catch (error) {
    console.log(
      `Error occured while trying to start express server: ${error.message}`
    );
  }
}

module.exports = start;

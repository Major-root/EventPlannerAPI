const authRouter = require("./src/controllers/authController");
const eventRouter = require("./src/controllers/eventController");

const apiPrefix = "/api/v1";

const routes = [
  { route: authRouter, prefix: "/auth" },
  { route: eventRouter, prefix: "/event" },
]; //

module.exports = (app) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}${element.prefix}`, element.route);
  });

  return app;
};

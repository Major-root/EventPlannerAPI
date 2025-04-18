const authRouter = require("./src/controllers/authController");

const apiPrefix = "/api/v1";

const routes = [{ route: authRouter, prefix: "/auth" }]; //

// exports.appRouter = (app) => {
//   routes.forEach((element) => {
//     app.use(`${apiPrefix}${element.prefix}`, element.route);
//   });
//   return app;
// };

module.exports = (app) => {
  routes.forEach((element) => {
    app.use(`${apiPrefix}${element.prefix}`, element.route);
  });

  return app;
};

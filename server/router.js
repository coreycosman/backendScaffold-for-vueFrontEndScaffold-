// IMPORTS:
const cors = require("cors");
const passport = require("passport");
const passportService = require("./services/passport");
const usersController = require("./controllers/users-controller");
const dashboardController = require("./controllers/dashboard-controller");

// ROUTER:

module.exports = app => {
  // MIDDLEWARE:
  // app.use(cors());
  app.use(cors({ origin: "http://localhost:8080" }));
  const requireAuth = passport.authenticate("jwt", { session: false });

  // Users Controller Routes:
  app.post("/users", usersController.signup);
  app.post("/users/login", usersController.login);
  app.patch("/users/update", requireAuth, usersController.update);

  // Dashboard Controller Routes
  app.get("/dashboard", dashboardController.dashboard);
};

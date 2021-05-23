const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate");
const {
  facebookLogin,
  googleLogin,
} = require("../controllers/auth.controllers");
const { getUser } = require("../controllers/user.controllers");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("API Version 1"));

// auth route
rootRouter.post("/facebook-login", facebookLogin);
rootRouter.post("/google-login", googleLogin);

// user route
rootRouter.get("/me", authenticate, getUser);

module.exports = { rootRouter };

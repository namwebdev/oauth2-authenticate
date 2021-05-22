const express = require("express");
const {
  facebookLogin,
  googleLogin,
} = require("../controllers/auth.controllers");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("API Version 1"));

// auth route
rootRouter.post("/facebook-login", facebookLogin);
rootRouter.post("/google-login", googleLogin);
//

module.exports = { rootRouter };

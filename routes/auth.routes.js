const express = require("express");
const { facebookLogin, googleLogin } = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post("/facebook", facebookLogin)
authRouter.post("/google", googleLogin)

module.exports = { authRouter };

const express = require("express");
const { facebookLogin, googleLogin } = require("../controllers/auth.controllers");
const { uploadAvatar } = require("../controllers/user.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadImage } = require("../middlewares/uploads/upload-image");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.send("API Version 1"));

// auth route
rootRouter.post("/facebook-login", facebookLogin);
rootRouter.post("/google-login", googleLogin);
//

rootRouter.post("/upload-image", authenticate, uploadImage(), uploadAvatar);

module.exports = { rootRouter };

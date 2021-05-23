const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

//
const GOOGLE_CLIENT_ID =
  "842421432342-g1v3tcpdqg1kos9cvsp6iucghqumn0fj.apps.googleusercontent.com";
const GOOGLE_SECREST_ID = "6Ll0XeyUVeNrZeJ1kRXGl4E1";
const FACEBOOK_APP_ID = "789519478423651";
const TOKEN_SECRET_KEY = "oauth-api";
//

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(GOOGLE_CLIENT_ID);

const { User } = require("../models/index");

const salt = bcrypt.genSaltSync(10);

const authController = {
  facebookLogin: async (req, res) => {
    const { access_token } = req.query;
    if (!access_token) {
      res.status(400).json({ message: "Access token is required" });
      return;
    }
    try {
      const URL = `https://graph.facebook.com/me?fields=name,picture&access_token=${access_token}`;
      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      if (data) {
        const { id, name } = data;
        const avatar = data.picture.data.url;

        const password = id + FACEBOOK_APP_ID;
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await User.findOne({ where: { username: id } });
        if (user) {
          const isMatch = bcrypt.compareSync(password, user.password);
          if (isMatch)
            res.status(200).json({
              message: "Login success",
              token: generateToken(id),
              isExist: true,
            });
          else res.status(401).json({ message: "Unauthorized" });
        } else {
          await User.create({
            name,
            username: id,
            password: hashPassword,
            avatar,
          });
          res.status(200).json({
            message: "Login success",
            token: generateToken(id),
            isExist: false,
          });
        }
      }
    } catch (err) {
      console.log("error", err);
      res.status(500).json({ message: err.error || "Something went wrong" });
    }
  },
  googleLogin: async (req, res) => {
    const { id_token } = req.query;

    try {
      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: GOOGLE_CLIENT_ID,
      });
      if (verify) {
        const { email, name, picture: avatar } = verify.payload;

        const password = email + GOOGLE_SECREST_ID;
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await User.findOne({ where: { username: email } });
        if (user) {
          const isMatch = bcrypt.compareSync(password, user.password);
          if (isMatch)
            res.status(200).json({
              message: "Login success",
              token: generateToken(email),
              isExist: true,
            });
          else res.status(401).json({ message: "Unauthorized" });
        } else {
          await User.create({
            name,
            username: email,
            password: hashPassword,
            avatar,
          });
          res.status(200).json({
            message: "Login success",
            token: generateToken(email),
            isExist: false,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err || "Something went wrong" });
    }
  },
};

const generateToken = (id) => {
  return jwt.sign({ email: id, type: "CLIENT" }, TOKEN_SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
};

module.exports = authController;

const Router = require("express").Router();

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const jwtSecret = "asdasdqwecxv";

Router.use(async (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;
  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      if (payload.roles.indexOf("admin") >= 0) next();
      else res.send({ success: false, message: "without authorization" });
    } catch (e) {
      res.send({ success: false, message: "without authorization" });
    }
  } else res.send({ success: false, message: "without token" });
});

Router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

module.exports = Router;

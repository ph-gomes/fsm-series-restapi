const Router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const jwtSecret = "asdasdqwecxv";

Router.post("/", async (req, res) => {
  const userDb = await User.findOne({ username: req.body.username });
  if (userDb) {
    if (userDb.password === req.body.password) {
      const payload = {
        id: userDb._id,
        username: userDb.username,
        roles: userDb.roles
      };
      const token = await jwt.sign(payload, jwtSecret);
      res.send({
        success: true,
        token
      });
    } else
      res.send({
        success: false,
        message: "wrong credentials"
      });
  } else
    res.send({
      success: false,
      message: "wrong credentials"
    });
});

module.exports = Router;

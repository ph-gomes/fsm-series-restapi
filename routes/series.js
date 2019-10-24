const Router = require("express").Router();
const jwt = require("jsonwebtoken");

const Series = require("../models/series");

const jwtSecret = "asdasdqwecxv";

Router.use(async (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;
  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      if (payload.roles.indexOf("restrict") >= 0) next();
      else res.send({ success: false, message: "without authorization" });
    } catch (e) {
      res.send({ success: false, message: "without authorization" });
    }
  } else res.send({ success: false, message: "without token" });
});

Router.get("/", async (req, res) => {
  const series = await Series.find({});
  res.send(series);
});

Router.get("/:id", async (req, res) => {
  const serie = await Series.findById(req.params.id);
  res.send(serie);
});

Router.post("/", async (req, res) => {
  try {
    const serie = await Series.create(req.body);
    await serie.save();
    res.send(serie);
  } catch (e) {
    res.send({
      success: false,
      erros: Object.keys(e.errors)
    });
  }
});

Router.delete("/:id", async (req, res) => {
  await Series.deleteOne({ _id: req.params.id });
  res.send({ success: true });
});

Router.put("/:id", async (req, res) => {
  const serie = await Series.findById(req.params.id);
  serie.name = req.body.name;
  serie.status = req.body.status;
  try {
    serie.save();
    res.send(serie);
  } catch (error) {
    res.send({
      success: false,
      erros: Object.keys(error.errors)
    });
  }
});

module.exports = Router;

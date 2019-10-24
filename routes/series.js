const Router = require("express").Router();
const Series = require("../models/series");

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

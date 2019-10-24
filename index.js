const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const series = require("./routes/series");

const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB || "mongodb://localhost/minhas-series-rest";

const app = express();

app.use(bodyParser.json({ extended: true }));

app.use("/series", series);

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${3000}`);
    });
  })
  .catch(e => console.log("can't initialize the server"));

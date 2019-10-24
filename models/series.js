const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: String
});

const SerieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enumValues: ["to-watch", "watching", "watched"],
    required: true
  },
  comments: [CommentSchema]
});

module.exports = mongoose.model("Serie", SerieSchema);

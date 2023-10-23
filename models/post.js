const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;

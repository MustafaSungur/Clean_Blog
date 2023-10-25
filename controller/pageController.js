const Post = require("../models/post");

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getPostDetail = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.render("post", { post });
};

exports.getAddPage = (req, res) => {
  res.render("add_post");
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit_post", { post });
};

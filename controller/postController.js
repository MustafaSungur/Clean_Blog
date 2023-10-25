const Post = require("../models/post");
const date = require("date-and-time");

exports.getAllPost = async (req, res) => {
  const pagePerPage = 3;
  const page = req.query.page || 1;
  const totalPost = await Post.find().countDocuments();

  const post = await Post.find()
    .sort("-dateCreated")
    .skip((page - 1) * pagePerPage)
    .limit(pagePerPage);

  const modifiedPost = post.map((item) => {
    const newDate = date.format(item.dateCreated, "YYYY/MM/DD HH:mm:ss");
    return { ...item._doc, dateCreated: newDate };
  });

  res.render("index", {
    post: modifiedPost,
    current: page,
    pages: Math.ceil(totalPost / pagePerPage),
  });
};

exports.createPost = (req, res) => {
  Post.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  res.redirect("/post/" + req.params.id);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/");
};

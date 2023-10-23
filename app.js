const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const date = require("date-and-time");

const Post = require("./models/post");
const formatDate = require("./formatDate");

mongoose.connect("mongodb://localhost/cleanblog-test-db");
console.log("Connect db");

const app = express();

// TAMPLATE ENGINE
app.set("view engine", "ejs");

// MIDLLLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get("/", async (req, res) => {
  const post = await Post.find().sort("-dateCreated");

  const modifiedPost = post.map((item) => {
    const newDate = date.format(item.dateCreated, "YYYY/MM/DD HH:mm:ss");

    return { ...item._doc, dateCreated: newDate };
  });

  res.render("index", { post: modifiedPost });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/add_post", (req, res) => {
  Post.create(req.body);
  res.redirect("/");
});

port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`${port} is up`);
});

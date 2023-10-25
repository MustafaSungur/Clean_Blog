const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require("method-override");

const pageController = require("./controller/pageController");
const postController = require("./controller/postController");

mongoose
  .connect("mongodb://localhost/cleanblog-test-db")
  .then(() => {
    console.log("CONNECTED DATABASE");
  })
  .catch((err) => console.log(err));

const app = express();

// TAMPLATE ENGINE
app.set("view engine", "ejs");

// MIDLLLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// PAGE CONTROLLER
app.get("/about", pageController.getAboutPage);
app.get("/post/:id", pageController.getPostDetail);
app.get("/add_post", pageController.getAddPage);
app.get("/post/edit/:id", pageController.getEditPage);

// POST CONTROLLER
app.get("/", postController.getAllPost);
app.post("/add_post", postController.createPost);
app.put("/post/:id", postController.updatePost);
app.delete("/post/:id", postController.deletePost);

port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`${port} is up`);
});

const express = require("express");
const ejs = require("ejs");
const app = express();

// TAMPLATE ENGINE
app.set("view engine", "ejs");

// MIDLLLEWARE
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`${port} is up`);
});

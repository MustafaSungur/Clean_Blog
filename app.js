const express = require("express");
const app = express();

const blog = { id: 1, title: "Blog title", description: "Blog description" };
app.get("/", (req, res) => {
  res.send(blog);
});

port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`${port} is up`);
});

const express = require("express");
const mysql = require("mysql")
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(3000, () => console.log("Serving at port 3000"))